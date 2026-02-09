import React from "react";
import CodeBlock from "../CodeBlock";

const OpenClawBlog = () => {
  const quickInstall = `# macOS / Linux / WSL
curl -fsSL https://openclaw.ai/install.sh | bash

# Then follow the interactive setup prompts
openclaw --help
openclaw init`;

  const dockerInstall = `# Docker (recommended for isolation)
# 1) Pull the image (replace with the official image if your docs specify a different one)
docker pull openclaw/openclaw:latest

# 2) Create a persistent volume for config + memory
docker volume create openclaw_data

# 3) Run OpenClaw
docker run -it --rm \\
  -p 3030:3030 \\
  --name openclaw \\
  -e OPENAI_API_KEY="$OPENAI_API_KEY" \\
  -v openclaw_data:/app/data \\
  openclaw/openclaw:latest

# Tip: if you want it always running, remove --rm and run with -d`;

  const sourceInstall = `# Run from source (advanced / contributors)
git clone https://github.com/openclaw-ai/openclaw.git
cd openclaw

# Install deps
pnpm install

# Build + start
pnpm build
pnpm start

# In another terminal (example)
pnpm openclaw init`;

  const requirements = `✅ Requirements
- OS: macOS / Linux / Windows (WSL2 recommended)
- Node.js: v18+ (some setups may require 20+ depending on your build)
- Git: installed and available in PATH
- A model provider key (OpenAI / Anthropic / etc.)
- Optional: Docker (recommended), pnpm (for source builds)`;

  const envExample = `# .env (example)
OPENAI_API_KEY=your_api_key_here

# Optional (examples — names may differ by setup)
# MODEL_PROVIDER=openai
# MODEL=gpt-4.1-mini
# OPENCLAW_PORT=3030

# If you connect chat platforms, you may also add:
# TELEGRAM_BOT_TOKEN=...
# DISCORD_BOT_TOKEN=...
# SLACK_BOT_TOKEN=...`;

  const firstRunChecklist = `✅ First-run checklist (do this once)
1) Choose your model provider (OpenAI / Anthropic / local)
2) Add API keys into .env (or secret manager)
3) Pick how you’ll talk to OpenClaw:
   - CLI (fastest)
   - Telegram / Discord / Slack (most convenient)
4) Decide permissions:
   - read-only (safest starter)
   - workspace-write (good for dev workflows)
   - full access (only if you truly need it)
5) Enable skills slowly (start minimal, expand later)`;

  const permissionLevels = `🛡️ Permission levels (simple way to think about it)
- Read-only:
  Great for summarizing, planning, drafting, analysis.
  Minimal risk: the agent can’t write files or run dangerous commands.

- Workspace-write:
  Ideal for dev repos: can edit files inside a specific folder/project.
  Good balance: it can help implement changes but stays sandboxed.

- Full access:
  Can run broad system commands, touch many files, and integrate deeply.
  Powerful — but you should treat it like giving admin access to a script.`;

  const safetyChecklist = `🔒 Safety checklist (real-world)
- Start in read-only mode for your first day
- Run in Docker/VM if you’ll enable “power” skills
- Use a separate API key for OpenClaw (don’t reuse your main key)
- Keep secrets in env vars / vault — never hardcode keys in skills
- Only enable skills you understand (or have reviewed)
- Log actions (at least initially) so you can spot weird behavior
- If something looks off: disable skills → rotate keys → restart`;

  const userJourneys = `👣 Three quick “user journeys” (pick yours)
1) Productivity mode (students / creators / busy humans)
   - Summarize messages, draft replies, plan your week, reminders

2) Developer mode (engineers)
   - Repo Q&A, code review prep, generate boilerplate, refactor suggestions

3) Ops / automation mode (teams / founders)
   - Scheduled reports, data pulls, alerts, routine workflows across tools`;

  const samplePrompts = `Try these prompts (copy/paste)
📩 Communication
1) "Summarize the last 20 messages and list what needs my response."
2) "Draft a friendly reply to this message: [paste message]"

🗓️ Planning
3) "Turn this list into a prioritized plan for today: [tasks]"
4) "Create a weekly schedule that includes deep work blocks."

💻 Developer workflows
5) "Scan this repo and suggest 5 refactors that reduce complexity."
6) "Explain what this function does and propose tests: [paste code]"

⚙️ Automation
7) "Every Monday morning, generate a weekly report from these notes: [paste]"
8) "Watch this folder and summarize new files daily."`;

  const troubleshooting = `🧰 Quick troubleshooting
- Install script fails:
  • Ensure curl + bash exist
  • Try running in WSL2 on Windows
  • Check network/proxy restrictions

- "Command not found: openclaw":
  • Restart terminal (PATH refresh)
  • Re-run installer
  • Confirm install location is in PATH

- Bot connects but doesn’t respond:
  • Validate tokens and env vars
  • Check logs for permission errors
  • Confirm the chosen model provider is reachable

- Unexpected actions / behavior:
  • Disable all skills
  • Switch to read-only mode
  • Rotate API keys and restart`;

  return (
    <div className="whitespace-normal">
      {/* Intro */}
      <p>
        Most AI tools are great at answering questions… and then they stop.
        <br />
        <br />
        <strong>OpenClaw</strong> is built for the moment when you’re thinking:
        “Cool answer — now can you actually <em>do</em> the thing?”
        <br />
        <br />
        It’s a self-hosted AI agent that can connect to your tools, run
        workflows, and keep operating beyond a single chat. If you’ve ever
        wished your assistant could move from “ideas” to “execution,” OpenClaw
        is worth your attention.
      </p>

      {/* What it is */}
      <h2 className="text-xl md:text-2xl font-bold mt-6">
        🦞 What Is OpenClaw (Clawdbot / MoltBot)?
      </h2>
      <p>
        <strong>OpenClaw</strong> (previously known as <strong>Clawdbot</strong>{" "}
        / <strong>MoltBot</strong>) is an <strong>open-source</strong>,{" "}
        <strong>self-hosted</strong> AI assistant that can run locally on your
        laptop, server, or VPS.
        <br />
        <br />
        Unlike “chat-only” tools, OpenClaw is designed to connect with services
        (like messaging apps) and perform actions through configurable{" "}
        <strong>skills</strong> and permission controls.
      </p>

      {/* Who it’s for */}
      <h2 className="text-xl md:text-2xl font-bold mt-6">
        👀 Who Is It For?
      </h2>
      <p>
        OpenClaw is most useful if you regularly deal with any of these:
        repetitive tasks, too many messages, recurring reports, dev chores, or
        admin overhead.
      </p>
      <CodeBlock
        code={userJourneys}
        language="text"
        fileName="User Journeys"
      />

      {/* Why it matters */}
      <h2 className="text-xl md:text-2xl font-bold mt-6">
        🔥 Why People Are Excited About It
      </h2>
      <ul className="list-disc pl-6 mt-2">
        <li>
          <strong>Action-first:</strong> it’s built to execute workflows, not
          just answer.
        </li>
        <li>
          <strong>You own the environment:</strong> run it locally or on your
          own infrastructure.
        </li>
        <li>
          <strong>Extensible by design:</strong> add capabilities via skills,
          not hacks.
        </li>
        <li>
          <strong>Fits real life:</strong> talk to it where you already are
          (CLI, chat apps, etc.).
        </li>
      </ul>

      {/* Core concepts */}
      <h2 className="text-xl md:text-2xl font-bold mt-6">
        🧩 Core Concepts (In Human Terms)
      </h2>

      <h3 className="text-l md:text-xl font-bold my-2">1) Agent</h3>
      <p>
        The agent is the personality + decision maker. You define what it’s for
        (productivity, dev, ops), and what it should prioritize (speed,
        accuracy, safety).
      </p>

      <h3 className="text-l md:text-xl font-bold my-2">2) Skills</h3>
      <p>
        Skills are “what it can do.” If you want OpenClaw to interact with
        tools—messages, repos, files, scripts—you enable the relevant skills.
        Start small. Add more as you trust your setup.
      </p>

      <h3 className="text-l md:text-xl font-bold my-2">3) Permissions</h3>
      <p>
        Permissions define the blast radius. This is your main safety lever:
        keep it narrow until you’re confident.
      </p>
      <CodeBlock
        code={permissionLevels}
        language="text"
        fileName="Permissions"
      />

      {/* Installation */}
      <h2 className="text-xl md:text-2xl font-bold mt-6">
        ⚙️ Installation Guide (User-Friendly)
      </h2>
      <p>
        Choose the setup that matches how you like to run tools. If you’re new
        to self-hosting, Docker is the easiest “safe default.”
      </p>

      <h2 className="text-l md:text-xl font-bold my-2">✅ Requirements</h2>
      <CodeBlock code={requirements} language="text" fileName="Requirements" />

      <h2 className="text-l md:text-xl font-bold my-2">
        ✅ Option A: Quick Install (macOS / Linux / WSL)
      </h2>
      <p>
        Best for: people who want the fastest install and don’t mind running it
        directly on their system.
      </p>
      <CodeBlock code={quickInstall} language="bash" fileName="Terminal" />

      <h2 className="text-l md:text-xl font-bold my-2">
        🐳 Option B: Docker (Recommended for Most People)
      </h2>
      <p>
        Best for: anyone who wants an isolated setup, easy upgrades, and fewer
        dependency issues.
      </p>
      <CodeBlock code={dockerInstall} language="bash" fileName="Terminal" />

      <h2 className="text-l md:text-xl font-bold my-2">
        🧑‍💻 Option C: Run From Source (Advanced)
      </h2>
      <p>
        Best for: contributors, tinkerers, or teams who want custom builds.
      </p>
      <CodeBlock code={sourceInstall} language="bash" fileName="Terminal" />

      <h2 className="text-l md:text-xl font-bold my-2">
        🔑 Environment Setup (.env)
      </h2>
      <p>
        Put secrets in env vars, not in code. This makes it safer and easier to
        rotate keys later.
      </p>
      <CodeBlock code={envExample} language="bash" fileName=".env" />

      <h2 className="text-l md:text-xl font-bold my-2">
        🚀 First Run & Onboarding
      </h2>
      <p>
        Once OpenClaw starts, follow the setup prompts to connect your model,
        choose your chat interface, and set permissions.
      </p>
      <CodeBlock
        code={firstRunChecklist}
        language="text"
        fileName="Checklist"
      />

      {/* What to do first */}
      <h2 className="text-xl md:text-2xl font-bold mt-6">
        🧠 What You Should Do First (So It Feels Useful Immediately)
      </h2>
      <p>
        Start with workflows that don’t require wide permissions. If OpenClaw
        proves helpful there, then expand gradually.
      </p>
      <CodeBlock
        code={samplePrompts}
        language="text"
        fileName="Starter Prompts"
      />

      {/* Security */}
      <h2 className="text-xl md:text-2xl font-bold mt-6">
        🔐 Security & Best Practices (User-Centric)
      </h2>
      <p>
        The biggest win with OpenClaw is autonomy — and the biggest risk is also
        autonomy. Here’s the practical way to stay safe without killing the fun.
      </p>
      <CodeBlock code={safetyChecklist} language="text" fileName="Safety" />

      {/* Troubleshooting */}
      <h2 className="text-xl md:text-2xl font-bold mt-6">
        🧰 Troubleshooting (Fast Fixes)
      </h2>
      <p>
        If something doesn’t work, don’t panic — it’s usually one of these
        common issues.
      </p>
      <CodeBlock
        code={troubleshooting}
        language="text"
        fileName="Troubleshooting"
      />

      {/* Closing */}
      <h2 className="text-xl md:text-2xl font-bold mt-6">
        ✨ Closing Thoughts
      </h2>
      <p>
        OpenClaw is a glimpse of where AI is heading: not just conversational,
        but operational.
        <br />
        <br />
        If you approach it like a powerful tool (start small, lock down
        permissions, enable skills intentionally), it can become a genuinely
        helpful “always-on” assistant — for work, for coding, and for everyday
        life.
      </p>
    </div>
  );
};

export default OpenClawBlog;
