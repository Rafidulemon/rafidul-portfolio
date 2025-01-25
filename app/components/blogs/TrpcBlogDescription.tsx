import React from 'react';

const TrpcBlogDescription = () => {
  return (
    <div>
      <p>
        tRPC allows you to build fully type-safe APIs without needing to write REST or GraphQL schemas. In this blog, 
        we break down tRPC’s benefits, how to set it up, and how it enhances development workflows.
      </p>
      <h3 className="text-xl font-semibold mt-6">Why tRPC?</h3>
      <p className="mt-2">
        tRPC eliminates the need for additional API schema definitions, enabling developers to enjoy full type safety
        directly from the client to the server. This approach simplifies API development and improves developer productivity
        by ensuring type correctness throughout the entire stack.
      </p>
      <h3 className="text-xl font-semibold mt-6">Key Benefits of tRPC:</h3>
      <ul className="list-disc pl-6 mt-2">
        <li>No need for REST or GraphQL schemas: Direct communication between frontend and backend.</li>
        <li>Type-safety: End-to-end type safety from frontend to backend.</li>
        <li>Improved developer experience: Strong typing leads to better autocompletion and error prevention.</li>
        <li>Simplified workflows: No need for manual API documentation or schema synchronization.</li>
      </ul>
      <p className="mt-4">
        tRPC streamlines the API development process, helping you focus on building features rather than managing APIs. 
        It’s particularly beneficial for full-stack applications where seamless type safety is crucial for productivity.
      </p>
    </div>
  );
};

export default TrpcBlogDescription;
