import React from "react";
import PageTitle from "../components/typography/PageTitle";
import Button from "../components/display/Button";
import { Text } from "../components/typography/Text";
import Projects from "../components/projects/Projects";
import Link from "next/link";

function page() {
  return (
    <div>
      <PageTitle name="PROJECTS" />
      <Projects />
      <div className="w-full flex flex-row justify-center">
        <Link href={"/contact"} className="w-fit my-10">
          <Button theme="primary" className="w-[200px]">
            <Text text="Contact me" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default page;
