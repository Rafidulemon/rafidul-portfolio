import React, { useEffect, useState } from "react";
import { Grid } from "../layout/Grid";
import { Text } from "../typography/Text";
import MotionDiv from "../animations/MotionDiv";
import Link from "next/link";

// Define the User type
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
  languages: Language[];
}

function PersonalDetails() {
  const [userData, setUserData] = useState<User | null>(null);
  const userId = "1";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <p className="text-white">Loading...</p>; // Optional: Add a loading state
  }

  return (
    <div className="p-10 rounded shadow-lg shadow-teal-700">
      <div className="pb-6 flex flex-row justify-center">
        <MotionDiv
          src={userData.image1 || "/images/image-1.png"} // Use user image if available
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
          <Text text="Name " isBold />
        </div>
        <div>
          <Text text={`${userData.first_name} ${userData.last_name}`} />
        </div>
        <div>
          <Text text="Occupation " isBold />
        </div>
        <div>
          <Text text={userData.occupation} />
        </div>
        <div>
          <Text text="Phone " isBold />
        </div>
        <div>
          <Text text={userData.phone} />
        </div>
        <div>
          <Text text="Email " isBold />
        </div>
        <Link href={`mailto:${userData.email}`}>
          <Text text={userData.email} className="text-cyan-500 underline" />
        </Link>
        <div>
          <Text text="Date of birth " isBold />
        </div>
        <div>
          <Text text={new Date(userData.dob).toLocaleDateString()} />{" "}
          {/* Format date if needed */}
        </div>
        <div>
          <Text text="Nationality " isBold />
        </div>
        <div>
          <Text text={userData.nationality} />
        </div>
        <div>
          <Text text="Address" isBold />
        </div>
        <div>
          <Text text={userData.address} />
        </div>
        <div>
          <Text text="Languages" isBold />
        </div>
        <div>
          <Text
            text={userData.languages
              .map((lang) => lang.language_name)
              .join(", ")}
          />{" "}
          {/* Display languages */}
        </div>
      </Grid>
    </div>
  );
}

export default PersonalDetails;
