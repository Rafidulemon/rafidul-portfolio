import React from "react";
import { Flex } from "../layout/Flex";
import { Text } from "../typography/Text";
import NavLink from "./NavLink";
import { Grid } from "../layout/Grid";
import { Line } from "../display/Line";
import Link from "next/link";

function Header() {
  return (
    <div className="w-full mb-4 bg-[#111111] shadow-4xl shadow-red-300">
      <Grid colCount={12} className="px-10 py-2">
        <Flex direction="row" className="col-span-2">
          <Link href={"/"}>
            <Text
              text="Rafid"
              className="tracking-widest drop-shadow-2xl text-cyan-500 md:text-[30px] md:text-[35px] xl:text-[40px] animate-pulse"
              isNosifer
              isBold
            />
          </Link>
        </Flex>
        <Flex
          direction="col"
          className="mt-3 md:text-[16px] lg:text-[20px] xl:text-[24px] w-full col-span-10 lg:px-6"
        >
          <NavLink />
        </Flex>
      </Grid>
      <Line className="border-white border-b-[1px]" />
    </div>
  );
}

export default Header;
