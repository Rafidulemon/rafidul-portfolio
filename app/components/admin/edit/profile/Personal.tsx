"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "@/app/components/layout/Grid";
import { Text } from "@/app/components/typography/Text";
import MotionDiv from "@/app/components/animations/MotionDiv";
import { TextInput } from "@/app/components/typography/TextInput";
import Button from "@/app/components/display/Button";
import Details from "@/app/components/admin/about-details/Details";
import Modal from "@/app/components/display/Modal";

interface PersonalProps {
  userId: string;
}

interface Language {
  language_name: string;
}

interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  occupation: string;
  phone: string;
  email: string;
  dob: Date;
  nationality: string;
  image1?: string;
  address: string;
  languages: string;
}

function Personal({ userId }: PersonalProps) {
  const [isDetailsPage, setDetailsPage] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data.user);
        console.log("Fetched User Data:", data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
              <React.Fragment>
                <div>
                  <Text text="First Name" isBold />
                </div>
                <div>
                  <TextInput value={userData?.first_name} />
                </div>

                <div>
                  <Text text="Last Name" isBold />
                </div>
                <div>
                  <TextInput value={userData?.last_name} />
                </div>

                <div>
                  <Text text="Occupation" isBold />
                </div>
                <div>
                  <TextInput value={userData?.occupation} />
                </div>

                <div>
                  <Text text="Phone" isBold />
                </div>
                <div>
                  <TextInput value={userData?.phone} />
                </div>

                <div>
                  <Text text="Email" isBold />
                </div>
                <div>
                  <TextInput value={userData?.email} />
                </div>

                <div>
                  <Text text="Date of Birth" isBold />
                </div>
                <div>
                  <TextInput
                    value={
                      userData?.dob
                        ? new Date(userData.dob).toLocaleDateString()
                        : ""
                    }
                  />
                </div>

                <div>
                  <Text text="Nationality" isBold />
                </div>
                <div>
                  <TextInput value={userData?.nationality} />
                </div>

                <div>
                  <Text text="Address" isBold />
                </div>
                <div>
                  <TextInput value={userData?.address} />
                </div>

                <div>
                  <Text text="Languages" isBold />
                </div>
                <div>
                  <TextInput value={userData?.languages} />
                </div>
              </React.Fragment>
            </Grid>
          </div>
          <div className="flex flex-row gap-6 mb-6">
            <Button
              theme="primary"
              onClick={() => setModalOpen(true)}
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
        <Details />
      )}

      {isModalOpen && (
        <Modal
          title="Confirmation"
          message="Are you sure you want to update the details?"
          onConfirm={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

export default Personal;
