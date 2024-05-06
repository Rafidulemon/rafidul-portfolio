"use client";

import React, { useState } from "react";
import { Text } from "../../components/typography/Text";
import PageTitle from "../../components/typography/PageTitle";
import { TextInput } from "../../components/typography/TextInput";
import Link from "next/link";
import Button from "../../components/display/Button";
import Image from "next/image";

function forgetPasswordPage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [rememberMe, setRememberMe] = useState(false);
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };
  return (
    <div className="w-full py-16 md:py-20">
      <PageTitle name="Forget Password" />
      <div className="w-full flex flex-col items-center relative z-0">
        <Image
          src="/images/login.png"
          alt="Logo"
          height={150}
          width={150}
          className="rounded-full bg-cyan-800 mt-8 relative z-10 w-[100px] md:w-[150px]"
        />
        <div className="relative z-0 -top-8 md:-top-14 sm:px-4 w-full flex flex-row justify-center mb-6">
          <div className="sm:w-[400px] md:w-[500px] h-[400px] md:h-[550px] bg-gradient-to-b from-cyan-800 p-6 md:p-8 shadow-md shadow-cyan-900">
            <form className="w-full mx-auto my-6">
              <div className="my-10">
                <TextInput
                  label="Email Address"
                  placeholder="Please enter your email here..."
                />
              </div>
              <Link href={"/auth/reset-password"}>
                <Button theme="primary" className="w-full">
                  <Text
                    text="Send  Reset Link"
                    className="text-white text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]"
                  />
                </Button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default forgetPasswordPage;
