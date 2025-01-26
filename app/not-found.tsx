"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Error404 = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="w-[90%] min-h-[calc(80vh-10px)] flex flex-col items-center justify-center text-center -mt-8 md:-mt-20">
        <div className="w-full max-w-[60%] md:max-w-md">
          <Image
            src="/images/404_snow.gif"
            alt="404 Page Not Found"
            width={500}
            height={380}
            className="w-full hidden dark:flex"
          />
        </div>

        <div className="w-full w-full md:w-[30%]">
          <Image
            src="/images/dark_404_1.gif"
            alt="404 Page Not Found"
            width={500}
            height={500}
            className="w-full h-full dark:hidden"
          />
        </div>

        <h1 className="text-5xl font-bold text-primary mb-4">Opps</h1>
        <h2 className="text-2xl font-semibold text-white dark:text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-white dark:text-gray-600 mb-6">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 text-white bg-primary rounded-lg shadow-md hover:bg-primary-dark transition duration-300"
          >
            Go to Home
          </button>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error404;