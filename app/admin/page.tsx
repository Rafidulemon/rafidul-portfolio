import React from "react";
import { Text } from "../components/typography/Text";

function adminPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Text text="Welcome to portfolio dashboard" className="text-cyan-400 md:text-[24px] lg:text-[30px] xl:text-[40px]" />
    </div>
  );
}

export default adminPage;
