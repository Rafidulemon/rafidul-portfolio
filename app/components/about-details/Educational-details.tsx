import React from "react";
import { Text } from "../typography/Text";
import { Grid } from "../layout/Grid";
import Link from "next/link";

function EducationalDetails() {
  return (
    <div className="flex flex-col p-10 rounded shadow-lg shadow-teal-700 gap-10">
      <div className="flex flex-col">
        <Text
          text="B.SC. IN COMPUTER SCIENCE AND ENGINEERING"
          isBold
          className="text-[16px] md:text-[18px] lg:text-[22px] xl:text-[24px] text-cyan-500 mb-4"
        />
        <Text
          text="BRAC University"
          className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] text-cyan-200"
          isBold
        />
        <Text text="Session : Summer 2016 to Summer 2020" className="text-white text-[11px] md:text-[13px] lg:text-[14px]" />
      </div>
      <div className="flex flex-col">
        <Text
          text="HIGHER SECONDARY CERTIFICATE
          (H.S.C)"
          isBold
          className="text-[16px] md:text-[18px] lg:text-[22px] xl:text-[24px] text-cyan-500 mb-4"
        />
        <Text text="Government City College ,Chittagong" className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] text-cyan-200" isBold />
        <Text text="Group : Science" className="text-white text-[11px] md:text-[13px] lg:text-[14px]" />
        <Text text="Passing Year : 2015" className="text-white text-[11px] md:text-[13px] lg:text-[14px]" />
      </div>
      <div className="flex flex-col">
        <Text
          text="SECONDARY SCHOOL CERTIFICATE
          (S.S.C)"
          isBold
          className="text-[16px] md:text-[18px] lg:text-[22px] xl:text-[24px] text-cyan-500 mb-4"
        />
        <Text
          text="Abdus Sobhan Rahat Ali High School,
          Patiya, Chittagong"
          className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] text-cyan-200"
          isBold
        />
        <Text
          text="Group : Science"
          className="text-white text-[11px] md:text-[13px] lg:text-[14px]"
        />
        <Text
          text="Passing Year : 2013"
          className="text-white text-[11px] md:text-[13px] lg:text-[14px]"
        />
      </div>
    </div>
  );
}

export default EducationalDetails;
