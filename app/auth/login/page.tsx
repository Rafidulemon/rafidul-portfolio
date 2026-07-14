"use client";

import { useForm } from "react-hook-form";
import Button from "@/app/components/display/Button";
import TextInput from "@/app/components/typography/TextInput";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (result.success) {
    console.log("Logged in");
  } else {
    console.log(result.message);
  }
};

  return (
    <main className="relative flex min-h-screen overflow-hidden text-white">

      <div className="relative mx-auto flex w-full max-w-7xl flex-col lg:flex-row">

        {/* Left Side */}
        <div className="flex flex-1 items-center justify-center px-10 py-20">
          <div className="max-w-xl">

            <p className="mb-3 text-cyan-400">
              Welcome Back
            </p>

            <h1 className="text-5xl font-bold leading-tight">
              Login to <br />
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Rafid`&apos;`s Portfolio
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-400">
              Explore projects, blogs, dashboards, and admin features.
            </p>

          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-1 items-center justify-center p-8">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

            <h2 className="mb-2 text-3xl font-bold">
              Sign In
            </h2>

            <p className="mb-8 text-gray-400">
              Enter your credentials.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <TextInput
                label="Email"
                name="email"
                placeholder="john@example.com"
                register={register}
                error={errors.email}
              />

              <TextInput
                label="Password"
                name="password"
                placeholder="••••••••"
                register={register}
                error={errors.password}
              />

              <div className="flex items-center justify-between text-sm">

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  Forgot Password?
                </button>

              </div>

              <Button
                type="submit"
                isWidthFull
              >
                Login
              </Button>

            </form>

          </div>

        </div>

      </div>

    </main>
  );
}