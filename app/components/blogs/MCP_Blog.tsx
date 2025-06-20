"use client";

import React from "react";

const MCP_Blog = () => {
  return (
    <div className="text-gray-800 dark:text-gray-300 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 leading-relaxed">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        Model Context Protocol (MCP) — A Beginner-Friendly Guide
      </h1>

      <p className="mb-4 text-base sm:text-lg">
        The <strong>Model Context Protocol (MCP)</strong> is an open-source standard developed by Anthropic that enables Large Language Models (LLMs) like Claude, ChatGPT, Gemini, and others to communicate with external tools, data sources, and services. You can think of MCP as the <strong>&apos;USB-C of AI agents&apos;</strong> — a universal connector between models and the world.
      </p>

      <h2 className="text-xl sm:text-2xl font-semibold mt-6">📘 What is MCP?</h2>
      <p className="mb-4">
        MCP defines a protocol for managing how LLMs can dynamically discover, call, and interact with external capabilities — such as file systems, APIs, or database queries — using a standard structure based on JSON-RPC 2.0.
      </p>

      <h2 className="text-xl sm:text-2xl font-semibold mt-6">🏛️ Architecture Overview</h2>
      <ul className="list-disc pl-6 space-y-2 mt-2">
        <li><strong>Host:</strong> The LLM agent or main app (e.g. Claude app).</li>
        <li><strong>Client:</strong> The middleware that manages server discovery and communication.</li>
        <li><strong>Server:</strong> Exposes tools, resources, and prompts to the host. This can be a local server, CLI, or remote API.</li>
      </ul>

      <h2 className="text-xl sm:text-2xl font-semibold mt-6">⚙️ Core Concepts</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Tools:</strong> Functions LLMs can call (e.g., `search(query)`).</li>
        <li><strong>Resources:</strong> Context data sent into the model (e.g., file content).</li>
        <li><strong>Prompts:</strong> Reusable structured prompt templates.</li>
      </ul>

      <h2 className="text-xl sm:text-2xl font-semibold mt-6">📦 Example Tool Definition</h2>
      <div className="overflow-x-auto mt-2">
        <pre className="bg-gray-900 text-white p-4 rounded-md text-sm sm:text-base min-w-[300px]">
{`// Example server tool definition (TypeScript)

{
  "tools": [
    {
      "name": "searchDocs",
      "description": "Searches internal documentation",
      "parameters": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "The search query"
          }
        },
        "required": ["query"]
      }
    }
  ]
}`}
        </pre>
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold mt-6">🔁 Typical Interaction Flow</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-md text-sm sm:text-base">
{`1. Host → Client: Request tool/resource list
2. Client → Server: Discover available tools
3. Host → Client → Server: Call 'searchDocs' with input
4. Server → Response with result
5. Client → Host: Show response to model`}
      </pre>

      <h2 className="text-xl sm:text-2xl font-semibold mt-6">🛠️ Real-World Use Cases</h2>
      <ul className="list-disc pl-6 space-y-2 mt-2">
        <li><strong>AI agents querying live databases</strong> via MCP servers.</li>
        <li><strong>File management tools</strong> letting LLMs read/write disk data.</li>
        <li><strong>Developers creating plug-and-play MCP servers</strong> to extend LLM capabilities.</li>
      </ul>

      <h2 className="text-xl sm:text-2xl font-semibold mt-6">🔐 Security Considerations</h2>
      <ul className="list-disc pl-6 space-y-2 mt-2">
        <li>Prompt injection and malicious tool calls are risks.</li>
        <li>Hosts should prompt users for permission before calling dangerous tools.</li>
        <li>MCP registries and sandboxes can limit what servers are trusted.</li>
      </ul>

      <h2 className="text-xl sm:text-2xl font-semibold mt-6">📚 Supported SDKs</h2>
      <ul className="list-disc pl-6 space-y-2 mt-2">
        <li>Official SDKs available in TypeScript, Python, Rust, Java, Ruby, Go, and C#</li>
        <li>Start your own MCP server using <code>npm create mcp-server</code></li>
      </ul>

      <h2 className="text-xl sm:text-2xl font-semibold mt-6">🎯 Why MCP Matters</h2>
      <p className="mb-4">
        Before MCP, every LLM tool integration required custom code. With MCP, any AI system can plug into any tool or data source that speaks the protocol — just like how USB simplified hardware connections.
      </p>
      <p className="mb-4">
        It’s a foundational shift toward standardization in AI ecosystems.
      </p>

      <h2 className="text-xl sm:text-2xl font-semibold mt-6">🎓 Conclusion</h2>
      <p className="mb-4">
        MCP is the universal language that helps LLMs extend their intelligence with real-world tools and context. Whether you&apos;re building agents, plugins, or AI copilots, understanding MCP will be key to the next generation of powerful, modular AI.
      </p>

      <p className="font-medium">
        Want a working code example or demo project using MCP? Just let me know, and I’ll create one for you!
      </p>
    </div>
  );
};

export default MCP_Blog;
