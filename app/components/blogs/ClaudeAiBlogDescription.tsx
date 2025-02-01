import React from 'react';
import { MdContentCopy } from 'react-icons/md';

const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
};

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
  <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md">
    <pre className="whitespace-pre-wrap font-mono text-sm md:text-[14px]">
      {code}
    </pre>
    <button
      className="absolute top-2 right-2 text-gray-300 hover:text-white"
      onClick={() => handleCopy(code)}
      aria-label="Copy command"
    >
      <MdContentCopy size={20} />
    </button>
  </div>
);

const ClaudeAiBlogDescription = () => {
  return (
    <div>
      <p>
        Claude is an advanced AI assistant designed to revolutionize human-computer interaction. In this blog, we dive 
        into Claude&apos;s capabilities, how it works, and why it stands out in the AI landscape.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">How Claude Works</h3>
      <p className="mt-2">
        Claude leverages deep learning and large language models to provide natural, context-aware responses. It processes
        user input, understands intent, and generates insightful and relevant replies. Unlike rule-based chatbots,
        Claude continuously learns and adapts based on user interactions.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">Why Choose Claude?</h3>
      <p className="mt-2">
        Claude is built for intuitive, human-like conversations, making it ideal for customer service, content creation,
        and personal assistance. With its ability to remember context and provide nuanced responses, Claude enhances
        productivity and engagement across various domains.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">Key Features of Claude:</h3>
      <ul className="list-disc pl-6 mt-2">
        <li>Advanced natural language processing for human-like interactions.</li>
        <li>Context-aware responses that adapt to user input dynamically.</li>
        <li>Ability to perform complex tasks, including summarization and content generation.</li>
        <li>Seamless integration with existing workflows and applications.</li>
      </ul>
      
      <h3 className="text-xl font-semibold mt-6">Setting Up Claude AI</h3>
      <p className="mt-2">To get started with Claude AI, follow these simple steps:</p>
      
      <h4 className="text-lg font-semibold mt-4">Installation</h4>
      <p>Install the necessary dependencies:</p>
      <CodeBlock code={`npm install @anthropic-ai/sdk`} />
      
      <h4 className="text-lg font-semibold mt-4">Using Claude AI in Your App</h4>
      <p>Here’s an example of how to integrate Claude AI into a JavaScript project:</p>
      <CodeBlock code={`import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function getClaudeResponse(prompt) {
  const response = await anthropic.complete({
    model: 'claude-2',
    prompt,
    maxTokens: 200,
  });
  console.log(response.completion);
}

getClaudeResponse("Hello Claude, how can you help me today?");`} />
      
      <h3 className="text-xl font-semibold mt-6">Claude&apos;s Impact on AI Interaction</h3>
      <p className="mt-2">
        Claude represents a major step forward in AI-powered interactions. From automating tasks to enhancing communication,
        it offers users an unparalleled experience in digital assistance.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">The Future of AI Assistants</h3>
      <p className="mt-4">
        As AI technology evolves, Claude continues to set new benchmarks in conversational AI. With ongoing improvements
        in contextual understanding and personalization, Claude is shaping the future of human-computer interaction.
      </p>
    </div>
  );
};

export default ClaudeAiBlogDescription;
