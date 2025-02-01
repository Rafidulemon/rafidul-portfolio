import React from 'react';
import { MdContentCopy } from 'react-icons/md';

const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
};

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
  <div className="relative bg-gray-800 text-white p-2 md:p-4 rounded-md">
    <pre className="whitespace-pre-wrap font-mono text-sm md:text-[14px] w-[80%] overflow-x-auto">
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

      <h3 className="text-xl font-semibold mt-6">Setting up tRPC in Next.js</h3>
      <p className="mt-2">
        To set up tRPC in a Next.js application, follow these steps.
      </p>

      <h4 className="text-lg font-semibold mt-4">Installation</h4>
      <p className='my-2'>Install tRPC and its dependencies:</p>
      <CodeBlock code={`npm install @trpc/server @trpc/client @trpc/react-query @tanstack/react-query zod`} />
      <p className="my-2">If using Yarn:</p>
      <CodeBlock code={`yarn add @trpc/server @trpc/client @trpc/react-query @tanstack/react-query zod`} />

      <h4 className="text-lg font-semibold mt-4">Setting up tRPC in App Router</h4>
      <p className='my-2'>Create an API route in <code>app/api/trpc/[trpc]/route.ts</code>:</p>
      <CodeBlock code={`import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '@/server/router';

export { createNextApiHandler({ router: appRouter }) as GET, POST };`} />

      <h4 className="text-lg font-semibold mt-4">Setting up a Dummy GET API</h4>
      <p className='my-2'>Create a service file <code>server/services/userService.ts</code>:</p>
      <CodeBlock code={`export const getUsers = () => {
  return [{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Doe" }];
};`} />

      <p className='text-left my-2'>Create a controller file <code>server/controllers/userController.ts</code>:</p>
      <CodeBlock code={`import { getUsers } from '../services/userService';

export const userController = {
  getAllUsers: () => {
    return getUsers();
  },
};`} />

      <p className='my-2'>Define a router in <code>server/router.ts</code>:</p>
      <CodeBlock code={`import { router, procedure } from '@trpc/server';
import { userController } from '@/server/controllers/userController';

export const appRouter = router({
  getUsers: procedure.query(() => {
    return userController.getAllUsers();
  }),
});

export type AppRouter = typeof appRouter;`} />

      <h4 className="text-lg font-semibold mt-4">Calling the API from a Page</h4>
      <p className='my-2'>In your Next.js page <code>app/users/page.tsx</code>, call the API:</p>
      <CodeBlock code={`"use client";
import { trpc } from '@/utils/trpc';
import { useEffect, useState } from 'react';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const { data, error } = trpc.getUsers.useQuery();

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (error) return <p>Error loading users</p>;
  return (
    <div>
      <h2 className="text-2xl font-semibold">Users List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;`} />
    </div>
  );
};

export default TrpcBlogDescription;
