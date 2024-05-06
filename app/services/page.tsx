import React from "react";
import PageTitle from "../components/typography/PageTitle";
import ServicessCard from "../components/cards/ServiceCard";
import { MdOutlineCode, MdAppShortcut } from "react-icons/md";
import { SiMaterialdesignicons } from "react-icons/si";
import Link from "next/link";
import Button from "../components/display/Button";
import { Text } from "../components/typography/Text";

function ServicesPage() {
  return (
    <div className="w-full pt-16 md:py-20">
      <PageTitle name="SERVICES" />
      <div className="w-full flex flex-col md:flex-row justify-center gap-6 my-16">
        <ServicessCard
          icon={
            <MdOutlineCode className="text-2xl lg:text-5xl" color="#FFFFFF" />
          }
          service_title="Front-End Developement"
          service_details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse libero officiis illum error, saepe quas eum obcaecati? Commodi tenetur quasi eligendi est! Cumque aspernatur ipsum soluta doloribus, reiciendis laborum! Corporis?"
        />
        <ServicessCard
          icon={
            <MdAppShortcut className="text-2xl lg:text-5xl" color="#FFFFFF" />
          }
          service_title="Mobile App Developement"
          service_details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse libero officiis illum error, saepe quas eum obcaecati? Commodi tenetur quasi eligendi est! Cumque aspernatur ipsum soluta doloribus, reiciendis laborum! Corporis?"
        />
        <ServicessCard
          icon={
            <SiMaterialdesignicons
              className="text-2xl lg:text-5xl"
              color="#FFFFFF"
            />
          }
          service_title="UI/UX Design"
          service_details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse libero officiis illum error, saepe quas eum obcaecati? Commodi tenetur quasi eligendi est! Cumque aspernatur ipsum soluta doloribus, reiciendis laborum! Corporis?"
        />
      </div>
      <Link href="/contact" className="w-full flex flex-row justify-center">
        <Button theme="primary">
          <Text text="Hire me" className="text-[12px] md:text-[16px] mx-4" />
        </Button>
      </Link>
    </div>
  );
}

export default ServicesPage;
