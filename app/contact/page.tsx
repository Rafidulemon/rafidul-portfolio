"use client";
import React from "react";
import { Flex } from "../components/layout/Flex";
import { Text } from "../components/typography/Text";
import ContactForm from "../components/form/ContactForm";
import { Grid } from "../components/layout/Grid";
import PageTitle from "../components/typography/PageTitle";
import MotionDiv from "../components/animations/MotionDiv";

const contactPage = () => {
  return (
    <div className="w-full">
      <PageTitle name="CONTACT ME" />
      <Grid colCount={12} className="mt-10">
        <MotionDiv src="/images/ai-image-2.png" className="col-span-4 hidden md:flex" isTransparentBG isRoundedImage/>
        <MotionDiv src="/images/ai-image-2.png" className="col-span-12 md:hidden flex flex-row items-center justify-center" isTransparentBG isRoundedImage height_width={200}/>
        <Flex
          direction="col"
          className="w-full col-span-12 md:col-span-8"
          alignItems="center"
          gap="0px"
        >
          <div className="mb-2 md:mb-6">
            <Text
              text="Let's get "
              isBold
              className="w-full text-center text-[24px] md:text-[48px] text-primary dark:text-white"
            />
            <Text
              text="connected"
              isBold
              className="w-full text-center text-[24px] md:text-[48px] text-primary_dark dark:text-cyan-500"
            />
          </div>
          <div>
            <Text
              text="Phone: "
              isBold
              className="w-full text-center text-[12px] md:text-[16px] text-primary dark:text-cyan-500"
            />
            <Text
              text="+8801990497796"
              isBold
              className="w-full text-center text-[12px] md:text-[16px] text-gray-700 dark:text-white "
            />
          </div>
          <div className="mb-10">
            <Text
              text="Email: "
              isBold
              className="w-full text-center text-[12px] md:text-[16px] text-primary dark:text-cyan-500"
            />
            <Text
              text="rafidulemon@gmail.com"
              isBold
              className="w-full text-center text-[12px] md:text-[16px] underline text-gray-700 dark:text-white"
            />
          </div>
          <ContactForm />
        </Flex>
      </Grid>
    </div>
  );
}

export default contactPage;
