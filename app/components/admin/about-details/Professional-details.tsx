import React from "react";
import { Grid } from "../../layout/Grid";
import { Text } from "../../typography/Text";
import Link from "next/link";

function ProfessionalDetails() {
  return (
    <Grid
      colCount={2}
      className="w-1/3 flex flex-col p-4 md:p-10 rounded shadow-lg shadow-teal-700 gap-4 md:gap-6 lg:gap-8 xl:gap-10"
    >
      <Text
        text="Software Engineer"
        isBold
        className="text-[16px] md:text-[18px] lg:text-[22px] xl:text-[24px] text-cyan-500"
      />
      <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
        <Link href={"https://bc-bangladesh.com/"}>
          <Text
            text="Brand Cloud Inc. Bangladesh"
            className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] text-cyan-200"
            isBold
          />
        </Link>
        <Text text="From August 2023 to Present" className="text-white text-[10px] md:text-[12px] lg:text-[13px] xl:text-[14px]" />
      </div>

      <Text
        text="Jr. Business Analyst"
        isBold
        className="text-[16px] md:text-[18px] lg:text-[22px] xl:text-[24px] text-cyan-500"
      />
      <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
        <Link href={"https://www.softbdltd.com/"}>
          <Text
            text="SoftBD Ltd."
            className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] text-cyan-200"
            isBold
          />
        </Link>
        <Text text="From January 2023 to July 2023" className="text-white text-[10px] md:text-[12px] lg:text-[13px] xl:text-[14px]" />
      </div>

      <Text text="Trainee" isBold className="text-[16px] md:text-[18px] lg:text-[22px] xl:text-[24px] text-cyan-500" />
      <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
        <Link href={"https://bjet.org/"}>
          <Text text="BJET" className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] text-cyan-200" isBold />
        </Link>
        <Text
          text="Bangladesh Japan ICT Engineers Training Program"
          className="text-[11px] md:text-[13px] lg:text-[15px] xl:text-[16px] text-cyan-200 -mt-2"
          isBold
        />
        <Text
          text="From April 2022 to September 2022"
          className="text-white text-[10px] md:text-[12px] lg:text-[13px] xl:text-[14px]"
        />
      </div>

      <Text
        text="Associate Software Engineer"
        isBold
        className="text-[16px] md:text-[18px] lg:text-[22px] xl:text-[24px] text-cyan-500"
      />
      <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
        <Link href={"https://nexkraft.com/"}>
          <Text
            text="Nexkraft Limited"
            className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] text-cyan-200"
            isBold
          />
        </Link>
        <Text text="Form November 2021 to March 2022" className="text-white text-[10px] md:text-[12px] lg:text-[13px] xl:text-[14px]" />
      </div>
    </Grid>
  );
}

export default ProfessionalDetails;
