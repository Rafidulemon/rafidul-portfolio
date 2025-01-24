import React, { useEffect, useState } from "react";
import { Grid } from "../layout/Grid";
import { Text } from "../typography/Text";
import MotionDiv from "../animations/MotionDiv";
import Link from "next/link";

const PersonalDetails = () => {
  return (
    <div className="p-10 rounded shadow-lg shadow-teal-700 bg-black dark:bg-white">
      <div>
        <div className="pb-6 flex flex-row justify-center">
          <MotionDiv
            src="/images/image-1.png"
            height_width={150}
            isRoundedImage
            isTransparentBG
          />
        </div>
        <Grid
          colCount={2}
          className="gap-4 md:gap-6 lg:gap-7 xl:gap-8 dark:text-black text-white text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px]"
        >
          <div>
            <Text text="Name " isBold />
          </div>
          <div>
            <Text text="Md. Rafidul Islam" />
          </div>
          <div>
            <Text text="Occupation " isBold />
          </div>
          <div>
            <Text text="Software Engineer" />
          </div>
          <div>
            <Text text="Phone " isBold />
          </div>
          <div>
            <Text text="+8801990497796" />
          </div>
          <div>
            <Text text="Email " isBold />
          </div>
          <Link href={`mailto:rafidulemon@gmail.com`}>
            <Text
              text="rafidulemon@gmail.com"
              className="text-cyan-500 underline"
            />
          </Link>
          <div>
            <Text text="Date of birth " isBold />
          </div>
          <div>
            <Text text="12 Nov 1997" />{" "}
          </div>
          <div>
            <Text text="Nationality " isBold />
          </div>
          <div>
            <Text text="Bangladeshi" />
          </div>
          <div>
            <Text text="Address" isBold />
          </div>
          <div>
            <Text text="Patiya, Chittagong, Bangladesh" />
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default PersonalDetails;
