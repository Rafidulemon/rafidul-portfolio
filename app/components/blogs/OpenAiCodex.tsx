"use client";
import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";

const OpenAiCodex = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
    const codexingithub = `
name: Perform a code review when a pull request is created.
on:
  pull_request:
    types: [opened]

jobs:
  codex:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    outputs:
      final_message: \${{ steps.run_codex.outputs.final-message }}
    steps:
      - uses: actions/checkout@v5
        with:
          ref: refs/pull/$\{{ github.event.pull_request.number }}/merge

      - name: Pre-fetch base and head refs for the PR
        run: |
          git fetch --no-tags origin \
            \${{ github.event.pull_request.base.ref }} \
            +refs/pull/\${{ github.event.pull_request.number }}/head

      - name: Run Codex
        id: run_codex
        uses: openai/codex-action@v1
        with:
          openai-api-key: \${{ secrets.OPENAI_API_KEY }}
          prompt: |
            This is PR #\${{ github.event.pull_request.number }} for \${{ github.repository }}.

            Review ONLY the changes introduced by the PR, so consider:
               git log --oneline \${{ github.event.pull_request.base.sha }}...\${{ github.event.pull_request.head.sha }}

            Suggest improvements, potential bugs, or issues.
            Be concise and specific.

            Pull request title and body:
            ----
            \${{ github.event.pull_request.title }}
            \${{ github.event.pull_request.body }}

  post_feedback:
    runs-on: ubuntu-latest
    needs: codex
    if: needs.codex.outputs.final_message != ''
    permissions:
      issues: write
      pull-requests: write
    steps:
      - name: Report Codex feedback
        uses: actions/github-script@v7
        env:
          CODEX_FINAL_MESSAGE: \${{ needs.codex.outputs.final_message }}
        with:
          github-token: \${{ github.token }}
          script: |
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.payload.pull_request.number,
              body: process.env.CODEX_FINAL_MESSAGE,
            });

`;
  return (
    <div className="whitespace-normal">
      <p>
        In the fast-evolving world of software development, productivity and
        creativity are two sides of the same coin. Developers constantly look
        for tools that make coding faster, smarter, and less repetitive. That’s
        where OpenAI Codex steps in — a groundbreaking AI model designed to
        understand and generate code.
        <br />
        <br />
        Codex isn’t just an assistant; it’s a pair programmer trained to
        interpret human language and write code in multiple programming
        languages. If you’ve ever used GitHub Copilot, you’ve already
        experienced the magic of Codex — because Copilot is powered by it!
      </p>
      <h2 className="text-xl md:text-2xl font-bold mt-6">💡 What Is OpenAI Codex?</h2>
      <p>
        <strong>OpenAI Codex</strong> is fine-tuned specifically on publicly
        available source code and natural language. It can understand plain
        English instructions and turn them into executable code.
      </p>

      <h2 className="text-xl md:text-2xl font-bold mt-6">🧩 Supported Languages</h2>
      <p>Codex supports dozens of programming languages, including:</p>
      <ul className="list-disc pl-6 mt-2">
        <li>JavaScript</li>
        <li>Python</li>
        <li>TypeScript</li>
        <li>Go</li>
        <li>Ruby</li>
        <li>PHP</li>
        <li>C#</li>
        <li>Shell scripting</li>
        <li>SQL, and more</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-bold mt-6">🎯 What Codex Can Do</h2>
      <ul className="list-disc pl-6 mt-2">
        <li>Convert comments or natural language prompts into code</li>
        <li>Explain existing code in plain English</li>
        <li>Generate boilerplate functions or repetitive snippets</li>
        <li>Translate code from one language to another</li>
        <li>Help debug or suggest improvements</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-bold mt-6">
        🖥️ Codex Is Now Integrated Directly Into VS Code
      </h2>
      <h3 className="text-l md:text-xl font-bold my-2">
        🚀 OpenAI Codex is now integrated directly into VS Code!
      </h3>
      <p>
        💡 Imagine writing code where your editor not only autocompletes, but
        actually understands your intent. That’s exactly what’s happening now —
        OpenAI Codex (the brain behind GitHub Copilot) is natively integrated
        into VS Code! ⚡
      </p>

      <h2 className="text-l md:text-xl md:text-2xl font-bold mt-6">
        🧠 What This Means for Developers
      </h2>
      <ul className="list-disc pl-6 mt-2">
        <li>
          No extra setup needed, just sign in with your GitHub Copilot
          account.
        </li>
        <li>
          Smarter code completions powered directly by OpenAI’s Codex model.
        </li>
        <li>
          Context-aware coding, understands your repo, comments, and
          functions.
        </li>
        <li>Instant explanations & suggestions via Copilot Chat.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-bold mt-6">⚙️ How OpenAI Codex Works</h2>
      <p>
        At its core, Codex takes textual input (prompt) and predicts the most
        likely continuation that satisfies your request — just like GPT models,
        but specialized for programming syntax and logic.
        <br />
        <br />
        It was trained on a mixture of:
      </p>
      <ul className="list-disc pl-6 mt-1">
        <li>Natural language (from books, articles, and documentation)</li>
        <li>Billions of lines of code from GitHub repositories</li>
      </ul>
      <p>
        This hybrid understanding allows Codex to reason contextually — it can
        read your prompt like “create a React login form with validation” and
        know what structure, components, and logic to use.
      </p>

      <h2 className="text-xl md:text-2xl font-bold mt-6">
        🧑‍💻 Getting Started with OpenAI Codex
      </h2>
      <h2 className="text-l md:text-xl font-bold my-2">1️⃣ Create an OpenAI Account</h2>
      <p>
        Go to{" "}
        <a
          href="https://openai.com/"
          target="_blank"
          className="text-blue-500"
          rel="noopener noreferrer"
        >
          OpenAI
        </a>{" "}
        and sign up for API access. Once logged in, you’ll find your API key in
        the{" "}
        <a
          href="https://platform.openai.com/account/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          dashboard
        </a>
        .
      </p>
      <h2 className="text-l md:text-xl font-bold my-2">
        2️⃣ Install the OpenAI Node.js SDK
      </h2>
      <p>Run the following command in your project:</p>
      <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md my-2">
        <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] md:-mt-6">
          {`
npm install openai
`}
        </pre>
        <button
          className="absolute top-2 right-2 text-gray-300 hover:text-white"
          onClick={() =>
            handleCopy(`
npm install openai
`)
          }
          aria-label="Copy command"
        >
          <MdContentCopy size={20} />
        </button>
      </div>

      <p>Then create a .env file to securely store your API key:</p>
      <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md my-2">
        <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] md:-mt-6">
          {`
OPENAI_API_KEY=your_api_key_here
`}
        </pre>
        <button
          className="absolute top-2 right-2 text-gray-300 hover:text-white"
          onClick={() =>
            handleCopy(`
OPENAI_API_KEY=your_api_key_here
`)
          }
          aria-label="Copy command"
        >
          <MdContentCopy size={20} />
        </button>
      </div>

      <h2 className="text-l md:text-xl font-bold my-2">3️⃣ Use Codex in JavaScript</h2>
      <p>
        Here’s a simple Node.js example that asks Codex to generate a function
        based on plain English instructions:
      </p>
      <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md my-2">
        <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] md:-mt-6">
          {`
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateCode(prompt) {
  const response = await openai.responses.create({
    model: "gpt-3.5-turbo-instruct",
    input: "Ask a Codex model to generate code based on the following prompt: ",
  });

  console.log (response.output[0].content[0].text);
}

generateCode("Write a JavaScript function that sorts an array of numbers in ascending order");

`}
        </pre>
        <button
          className="absolute top-2 right-2 text-gray-300 hover:text-white"
          onClick={() =>
            handleCopy(`
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateCode(prompt) {
  const response = await openai.responses.create({
    model: "gpt-3.5-turbo-instruct",
    input: "Ask a Codex model to generate code based on the following prompt: ",
  });

  console.log(response.output[0].content[0].text);
}

generateCode("Write a JavaScript function that sorts an array of numbers in ascending order");

`)
          }
          aria-label="Copy command"
        >
          <MdContentCopy size={20} />
        </button>
      </div>

      <p>✅ Output:</p>
      <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md my-2">
        <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] md:-mt-6">
          {`
function sortArray(arr) {
  return arr.sort((a, b) => a - b);
}
`}
        </pre>
        <button
          className="absolute top-2 right-2 text-gray-300 hover:text-white"
          onClick={() =>
            handleCopy(`
function sortArray(arr) {
  return arr.sort((a, b) => a - b);
}
`)
          }
          aria-label="Copy command"
        >
          <MdContentCopy size={20} />
        </button>
      </div>

      <h2 className="text-xl md:text-2xl font-bold mt-6">🛠️ Codex GitHub Action</h2>
      <p>
        You can now run Codex from a GitHub Actions workflow while keeping tight
        control over privileges. This action installs the Codex CLI and
        configures it with a secure proxy to the Responses API.
      </p>
      <h2 className="text-l font-bold mt-6">🔑 Requirements</h2>
      <p>
        Users must provide their <strong>OPENAI_API_KEY</strong> as a GitHub
        Actions secret.
      </p>
      <h2 className="text-l font-bold mt-6">
        ⚡ Example: Create Your Own Pull Request Bot
      </h2>
            <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md my-2">
        <pre className="whitespace-pre-wrap font-fira_code text-[12px] md:text-[14px] md:-mt-6">
          {codexingithub}
        </pre>
        <button
          className="absolute top-2 right-2 text-gray-300 hover:text-white"
          onClick={() =>
            handleCopy(codexingithub)
          }
          aria-label="Copy command"
        >
          <MdContentCopy size={20} />
        </button>
      </div>
      <h2 className="text-xl md:text-2xl font-bold mt-6">⚙️ Inputs & Safety Strategy</h2>
      <ul className="list-disc pl-6 mt-2">
        <li>openai-api-key: Secret for API access (required).</li>
        <li>prompt / prompt-file: Inline or file-based prompts.</li>
        <li>sandbox: Controls Codex permissions (workspace-write default, read-only, danger-full-access).</li>
        <li>safety-strategy: Privilege control (drop-sudo, unprivileged-user, read-only, unsafe).</li>
      </ul>
    </div>
  );
};

export default OpenAiCodex;
