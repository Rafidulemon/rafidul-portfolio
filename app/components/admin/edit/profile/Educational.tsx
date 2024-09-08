"use client";
import React, { useState } from "react";
import { Grid } from "@/app/components/layout/Grid";
import { Text } from "@/app/components/typography/Text";
import { TextInput } from "@/app/components/typography/TextInput";
import Button from "@/app/components/display/Button";
import Details from "@/app/components/about-details/Details";

function Educational() {
  const [degree1] = useState<string>(
    "B.SC. IN COMPUTER SCIENCE AND ENGINEERING"
  );
  const [institute1] = useState<string>("BRAC University");
  const [session1] = useState<string>("Summer 2016 to Summer 2020");

  const [degree2] = useState<string>("HIGHER SECONDARY CERTIFICATE (H.S.C)");
  const [institute2] = useState<string>("Government City College, Chittagong");
  const [group2] = useState<string>("Science");
  const [year2] = useState<string>("2015");

  const [degree3] = useState<string>("SECONDARY SCHOOL CERTIFICATE (S.S.C)");
  const [institute3] = useState<string>(
    "Abdus Sobhan Rahat Ali High School, Patiya, Chittagong"
  );
  const [group3] = useState<string>("Science");
  const [year3] = useState<string>("2013");
  const [isDetailsPage, setDetailsPage] = useState<boolean>(false);

  return (
    <>
      {!isDetailsPage ? (
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="w-1/2 p-10 rounded shadow-lg shadow-teal-700">
            <Grid
              colCount={2}
              className="gap-4 md:gap-6 lg:gap-7 xl:gap-8 text-white text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px]"
            >
              {/* Degree 1 */}
              <div>
                <Text text="Degree" isBold />
              </div>
              <div>
                <TextInput value={degree1} />
              </div>

              <div>
                <Text text="Institute" isBold />
              </div>
              <div>
                <TextInput value={institute1} />
              </div>

              <div>
                <Text text="Session" isBold />
              </div>
              <div>
                <TextInput value={session1} />
              </div>

              {/* Degree 2 */}
              <div>
                <Text text="Degree" isBold />
              </div>
              <div>
                <TextInput value={degree2} />
              </div>

              <div>
                <Text text="Institute" isBold />
              </div>
              <div>
                <TextInput value={institute2} />
              </div>

              <div>
                <Text text="Group" isBold />
              </div>
              <div>
                <TextInput value={group2} />
              </div>

              <div>
                <Text text="Passing Year" isBold />
              </div>
              <div>
                <TextInput value={year2} />
              </div>

              {/* Degree 3 */}
              <div>
                <Text text="Degree" isBold />
              </div>
              <div>
                <TextInput value={degree3} />
              </div>

              <div>
                <Text text="Institute" isBold />
              </div>
              <div>
                <TextInput value={institute3} />
              </div>

              <div>
                <Text text="Group" isBold />
              </div>
              <div>
                <TextInput value={group3} />
              </div>

              <div>
                <Text text="Passing Year" isBold />
              </div>
              <div>
                <TextInput value={year3} />
              </div>
            </Grid>
          </div>

          <div className="flex flex-row gap-6 mb-6">
            <Button
              theme="primary"
              className="w-[200px]"
              onClick={() => setDetailsPage(true)}
            >
              Save
            </Button>
            <Button
              theme="secondary"
              className="w-[200px]"
              onClick={() => setDetailsPage(true)}
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

export default Educational;
