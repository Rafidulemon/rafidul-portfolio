"use client";
import React, { useState } from "react";
import Details from "@/app/components/about-details/Details";
import Button from "@/app/components/display/Button";

function Professional() {
  const [isDetailsPage, setDetailsPage] = useState<boolean>(false);
  return (
    <>
      {!isDetailsPage ? (
        <div>
          This is Professional Profile Edit page
          <Button theme="primary" onClick={() => setDetailsPage(true)}>
            Back to Profile
          </Button>
        </div>
      ) : (
        <Details isAdmin />
      )}
    </>
  );
}

export default Professional;
