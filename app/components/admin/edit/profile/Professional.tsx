"use client";
import React, { useState } from "react";
import { Grid } from "@/app/components/layout/Grid";
import { Text } from "@/app/components/typography/Text";
import { TextInput } from "@/app/components/typography/TextInput";
import Details from "@/app/components/about-details/Details";
import Button from "@/app/components/display/Button";

function Professional() {
  const [position1, setPosition1] = useState<string>("Software Engineer");
  const [company1, setCompany1] = useState<string>(
    "Brand Cloud Inc. Bangladesh"
  );
  const [duration1, setDuration1] = useState<string>(
    "From August 2023 to Present"
  );
  const [link1] = useState<string>("https://bc-bangladesh.com/");

  const [position2, setPosition2] = useState<string>("Jr. Business Analyst");
  const [company2, setCompany2] = useState<string>("SoftBD Ltd.");
  const [duration2, setDuration2] = useState<string>(
    "From January 2023 to July 2023"
  );
  const [link2] = useState<string>("https://www.softbdltd.com/");

  const [position3, setPosition3] = useState<string>("Trainee");
  const [company3, setCompany3] = useState<string>("BJET");
  const [program3] = useState<string>(
    "Bangladesh Japan ICT Engineers Training Program"
  );
  const [duration3, setDuration3] = useState<string>(
    "From April 2022 to September 2022"
  );
  const [link3] = useState<string>("https://bjet.org/");

  const [position4, setPosition4] = useState<string>(
    "Associate Software Engineer"
  );
  const [company4, setCompany4] = useState<string>("Nexkraft Limited");
  const [duration4, setDuration4] = useState<string>(
    "From November 2021 to March 2022"
  );
  const [link4] = useState<string>("https://nexkraft.com/");
  const [isDetailsPage, setDetailsPage] = useState<boolean>(false);

  return (
    <>
      {!isDetailsPage ? (
        <div className="flex flex-col items-center justify-center gap-10">
          <Grid
            colCount={2}
            className="w-1/2 flex flex-col p-4 md:p-10 rounded shadow-lg shadow-teal-700 gap-4 md:gap-6 lg:gap-8 xl:gap-10"
          >
            <div>
              <Text text="Position" isBold />
              <TextInput value={position1} />
            </div>
            <div>
              <Text text="Company" isBold />
              <TextInput value={company1} className="mb-4" />
              <Text text="Work Duration" isBold />
              <TextInput value={duration1} />
            </div>

            <div>
              <Text text="Position" isBold />
              <TextInput value={position2} />
            </div>
            <div>
              <Text text="Company" isBold />
              <TextInput value={company2} className="mb-4" />
              <Text text="Work Duration" isBold />
              <TextInput value={duration2} />
            </div>

            <div>
              <Text text="Position" isBold />
              <TextInput value={position3} />
            </div>
            <div>
              <Text text="Company" isBold />
              <TextInput value={company3} className="mb-4" />
              <Text text="Work Duration" isBold />
              <TextInput value={duration3} />
            </div>

            <div>
              <Text text="Position" isBold />
              <TextInput value={position4} />
            </div>
            <div>
              <Text text="Company" isBold />
              <TextInput value={company4} className="mb-4" />
              <Text text="Work Duration" isBold />
              <TextInput value={duration4} />
            </div>
            <div className="w-full flex flex-row items-center justify-center col-span-2">
              <Button
                theme="primary"
              >
                Add New Experience
              </Button>
            </div>
          </Grid>
          <div className="flex flex-row gap-6 mb-6">
            <Button
              theme="primary"
              onClick={() => setDetailsPage(true)}
              className="w-[200px]"
            >
              Save
            </Button>
            <Button
              theme="secondary"
              onClick={() => setDetailsPage(true)}
              className="w-[200px]"
            >
              Back to Profile
            </Button>
          </div>
        </div>
      ) : (
        <Details isAdmin />
      )}
    </>
  );
}

export default Professional;
