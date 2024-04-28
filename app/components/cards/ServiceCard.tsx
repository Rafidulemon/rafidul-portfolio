import React from "react";
import Image from "next/image";
import { Text } from "../typography/Text";

interface ServicesCardProps {
  icon: React.ReactNode;
  service_title: string;
  service_details: string;
}

function ServicessCard(props: ServicesCardProps) {
  const { icon, service_title = "", service_details = "" } = props;
  return (
    <div className="bg-[#111111] rounded-2xl min-h-[200px] md:w-[450px] flex shadow-md shadow-cyan-900 flex flex-col gap-0">
      <div className="flex flex-row justify-start mx-4 my-2">
        {icon}
      </div>
      <div className="flex flex-col mx-4 my-2">
        <Text text={service_title} isBold className="text-[12px] md:text-[15px] lg:text-[18px] mb-2"/>
        <Text text={service_details} className="text-[#ADB7BE] text-justify text-[10px] md:text-[14px] lg:text-[16px]" />
      </div>
    </div>
  );
}

export default ServicessCard;
