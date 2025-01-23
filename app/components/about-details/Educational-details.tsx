import React, { useEffect, useState } from "react";
import { Text } from "../typography/Text";

const EducationalDetails =() => {
  return (
    <div className="flex flex-col p-10 rounded shadow-lg shadow-teal-700 gap-10">
      <div className="flex flex-col">
        <Text
          text="B.SC. in Computer Science & Engineering"
          isBold
          className="text-cyan-500 mb-4 text-[22px]"
        />
        <Text
          text="BRAC University"
          isBold
          className="text-cyan-200 text-[16px]"
        />
        <Text
          text="Computer Science & Engineering"
          className="text-white text-[14px]"
        />
        <Text text={`Passing Year: 2020`} className="text-white text-[14px]" />
      </div>

      <div className="flex flex-col">
        <Text
          text="Higher Secondary Certificate"
          isBold
          className="text-cyan-500 mb-4 text-[22px]"
        />
        <Text
          text="Govt. City College, Chittagong"
          isBold
          className="text-cyan-200 text-[16px]"
        />
        <Text
          text="Science"
          className="text-white text-[14px]"
        />
        <Text text={`Passing Year: 2015`} className="text-white text-[14px]" />
      </div>

      <div className="flex flex-col">
        <Text
          text="Secondary Secondary Certificate"
          isBold
          className="text-cyan-500 mb-4 text-[22px]"
        />
        <Text
          text="Abdus Sobhan Rahat Ali High School, Patiya, Chittagong"
          isBold
          className="text-cyan-200 text-[16px]"
        />
        <Text
          text="Science"
          className="text-white text-[14px]"
        />
        <Text text={`Passing Year: 2013`} className="text-white text-[14px]" />
      </div>
    </div>
  );
}

export default EducationalDetails;
