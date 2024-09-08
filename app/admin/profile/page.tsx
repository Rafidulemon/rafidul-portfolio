import MotionDiv from "@/app/components/animations/MotionDiv";
import React from "react";
import { Text } from "@/app/components/typography/Text";
import { TextGroup } from "@/app/components/typography/TextGroup";
import PageTitle from "@/app/components/typography/PageTitle";
import Button from "@/app/components/display/Button";
import Details from "@/app/components/about-details/Details";

function profilePage() {
  return (
    <div className="w-full flex flex-col items-center">
      <PageTitle name="Profile" />
        <div className="w-full mt-10">
        <Details isAdmin/>
      </div>
    </div>
  );
}

export default profilePage;
