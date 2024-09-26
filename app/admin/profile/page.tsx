import React from "react";
import PageTitle from "@/app/components/typography/PageTitle";
import Details from "@/app/components/admin/about-details/Details";

function profilePage() {
  return (
    <div className="w-full flex flex-col items-center">
      <PageTitle name="Profile" />
        <div className="w-full mt-10">
        <Details isAdmin/>
      </div>
    </div>
  );
}

export default profilePage;
