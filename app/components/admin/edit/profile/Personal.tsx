"use client";
import React, { useState } from "react";
import { Grid } from "@/app/components/layout/Grid";
import { Text } from "@/app/components/typography/Text";
import MotionDiv from "@/app/components/animations/MotionDiv";
import { TextInput } from "@/app/components/typography/TextInput";
import Button from "@/app/components/display/Button";
import Details from "@/app/components/about-details/Details";

function Personal() {
  const [name, setName] = useState<string>("Md. Rafidul Islam");
  const [occupation, setOccupation] = useState<string>("Software Engineer");
  const [phone, setPhone] = useState<string>("+8801111111111");
  const [email, setEmail] = useState<string>("rafidul@example.com");
  const [dob, setDob] = useState<string>("12 November 1997");
  const [nationality, setNationality] = useState<string>("Bangladeshi");
  const [address, setAddress] = useState<string>("Patiya, Chittagong");
  const [languages, setLanguages] = useState<string>("English, Bengali");
  const [isDetailsPage, setDetailsPage] = useState<boolean>(false);

  return (
    <>
      {!isDetailsPage ? (
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="w-1/2 items-center p-10 rounded shadow-lg shadow-teal-700">
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
              className="gap-4 md:gap-6 lg:gap-7 xl:gap-8 text-white text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px]"
            >
              <div>
                <Text text="Name" isBold />
              </div>
              <div>
                <TextInput value={name} />
              </div>

              <div>
                <Text text="Occupation" isBold />
              </div>
              <div>
                <TextInput value={occupation} />
              </div>

              <div>
                <Text text="Phone" isBold />
              </div>
              <div>
                <TextInput value={phone} />
              </div>

              <div>
                <Text text="Email" isBold />
              </div>
              <div>
                <TextInput value={email} />
              </div>

              <div>
                <Text text="Date of Birth" isBold />
              </div>
              <div>
                <TextInput value={dob} />
              </div>

              <div>
                <Text text="Nationality" isBold />
              </div>
              <div>
                <TextInput value={nationality} />
              </div>

              <div>
                <Text text="Address" isBold />
              </div>
              <div>
                <TextInput value={address} />
              </div>

              <div>
                <Text text="Languages" isBold />
              </div>
              <div>
                <TextInput value={languages} />
              </div>
            </Grid>
          </div>
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

export default Personal;
