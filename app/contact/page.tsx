"use client";
import React from "react";
import { Flex } from "../components/layout/Flex";
import { Text } from "../components/typography/Text";
import ContactForm from "../components/form/ContactForm";
import { motion } from "framer-motion";
import Image from "next/image";
import { Grid } from "../components/layout/Grid";
import PageTitle from "../components/typography/PageTitle";
import MotionDiv from "../components/animations/MotionDiv";

function page() {
  return (
    <div className="w-full">
      <PageTitle name="CONTACT ME" />
      <Grid colCount={12} className="mt-10">
        <MotionDiv src="/images/ai-image-2.png" className="col-span-4" isTransparentBG isRoundedImage/>
        <Flex
          direction="col"
          className="w-full col-span-8"
          alignItems="center"
          gap="0px"
        >
          <div className="mb-6">
            <Text
              text="Let's get "
              isBold
              className="w-full text-center text-[48px]"
            />
            <Text
              text="connected"
              isBold
              className="w-full text-center text-[48px] text-cyan-500"
            />
          </div>
          <div>
            <Text
              text="Phone: "
              isBold
              className="w-full text-center text-[16px] text-cyan-500"
            />
            <Text
              text="+8801111111111"
              isBold
              className="w-full text-center text-[16px] "
            />
          </div>
          <div className="mb-10">
            <Text
              text="Email: "
              isBold
              className="w-full text-center text-[16px] text-cyan-500"
            />
            <Text
              text="rafidul@example.com"
              isBold
              className="w-full text-center text-[16px] underline"
            />
          </div>
          <ContactForm />
        </Flex>
      </Grid>
    </div>
  );
}

export default page;
