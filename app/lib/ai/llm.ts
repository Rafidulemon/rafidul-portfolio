import OpenAI from "openai";

export type LlmMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type Provider = { name: string; client: OpenAI; model: string };

let cachedProviders: Provider[] | null = null;

// Groq first (~0.5s to first token), Gemini as the automatic fallback.
// Both expose OpenAI-compatible endpoints, so one SDK covers both.
const getProviders = (): Provider[] => {
  if (cachedProviders) return cachedProviders;
  const list: Provider[] = [];
  if (process.env.GROQ_API_KEY) {
    list.push({
      name: "groq",
      client: new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
        maxRetries: 0,
      }),
      model: process.env.GROQ_MODEL ?? "openai/gpt-oss-120b",
    });
  }
  if (process.env.GEMINI_API_KEY) {
    list.push({
      name: "gemini",
      client: new OpenAI({
        apiKey: process.env.GEMINI_API_KEY,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
        maxRetries: 0,
      }),
      model: process.env.GEMINI_MODEL ?? "gemini-3.5-flash-lite",
    });
  }
  cachedProviders = list;
  return list;
};

const FIRST_TOKEN_TIMEOUT_MS = 8000;
export const EMBEDDING_DIMENSIONS = 768;
export const EMBEDDING_MODEL = process.env.GEMINI_EMBEDDING_MODEL ?? "gemini-embedding-001";

export const hasLlm = () => getProviders().length > 0;

export type OpenedStream = {
  provider: string;
  first: string;
  next: () => Promise<string | null>;
};

/**
 * Opens a streaming completion. Tries each provider until one yields a first
 * token, so the caller can still return a clean error before any bytes are sent.
 */
export async function openStream(
  messages: LlmMessage[],
  temperature = 0.4
): Promise<OpenedStream> {
  let lastError: unknown = new Error("No LLM provider configured");
  for (const provider of getProviders()) {
    try {
      const controller = new AbortController();
      const stream = await provider.client.chat.completions.create(
        {
          model: provider.model,
          messages,
          temperature,
          stream: true,
        },
        { timeout: FIRST_TOKEN_TIMEOUT_MS, signal: controller.signal }
      );
      const iterator = stream[Symbol.asyncIterator]();
      const pull = async (): Promise<string | null> => {
        for (;;) {
          const { value, done } = await iterator.next();
          if (done) return null;
          const text = value.choices?.[0]?.delta?.content;
          if (text) return text;
        }
      };
      // A slow provider is worse than a failed one: give up on it quickly.
      let timer: ReturnType<typeof setTimeout> | undefined;
      const first = await Promise.race([
        pull(),
        new Promise<never>((_, reject) => {
          timer = setTimeout(() => {
            controller.abort();
            reject(new Error(`${provider.name} first token timeout`));
          }, FIRST_TOKEN_TIMEOUT_MS);
        }),
      ]).finally(() => clearTimeout(timer));
      if (first === null) throw new Error(`${provider.name} returned no content`);
      return { provider: provider.name, first, next: pull };
    } catch (error) {
      console.error(`[ai] ${provider.name} stream failed:`, error);
      lastError = error;
    }
  }
  throw lastError;
}

export async function completeText(
  messages: LlmMessage[],
  opts: { json?: boolean; temperature?: number; timeout?: number } = {}
): Promise<string> {
  let lastError: unknown = new Error("No LLM provider configured");
  for (const provider of getProviders()) {
    try {
      const res = await provider.client.chat.completions.create(
        {
          model: provider.model,
          messages,
          temperature: opts.temperature ?? 0.3,
          ...(opts.json ? { response_format: { type: "json_object" as const } } : {}),
        },
        { timeout: opts.timeout ?? 25000 }
      );
      const text = res.choices?.[0]?.message?.content?.trim();
      if (text) return text;
      throw new Error(`${provider.name} returned empty content`);
    } catch (error) {
      console.error(`[ai] ${provider.name} completion failed:`, error);
      lastError = error;
    }
  }
  throw lastError;
}

export async function completeJson<T>(
  messages: LlmMessage[],
  opts: { temperature?: number; timeout?: number } = {}
): Promise<T> {
  const raw = await completeText(messages, { ...opts, json: true });
  const cleaned = raw.replace(/^```(?:json)?\s*|\s*```$/g, "");
  return JSON.parse(cleaned) as T;
}

export async function embedTexts(
  texts: string[],
  opts: { timeout?: number } = {}
): Promise<number[][] | null> {
  const gemini = getProviders().find((p) => p.name === "gemini");
  if (!gemini) return null;
  const model = EMBEDDING_MODEL;
  const out: number[][] = [];
  const BATCH = 50;
  for (let i = 0; i < texts.length; i += BATCH) {
    const res = await gemini.client.embeddings.create(
      { model, input: texts.slice(i, i + BATCH), dimensions: EMBEDDING_DIMENSIONS },
      { timeout: opts.timeout ?? 20000 }
    );
    res.data.forEach((item) => out.push(item.embedding));
  }
  return out;
}
