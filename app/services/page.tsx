import React from "react";
import PageTitle from "../components/typography/PageTitle";
import ServicessCard from "../components/cards/ServiceCard";
import { MdOutlineCode, MdAppShortcut } from "react-icons/md";
import { SiMaterialdesignicons } from "react-icons/si";
import Link from "next/link";
import Button from "../components/display/Button";
import { Text } from "../components/typography/Text";
import servicesData from "../data/services.json";
import { ServiceInfo } from "@/types/content";

const serviceIconMap: Record<ServiceInfo["iconKey"], JSX.Element> = {
  web: <MdOutlineCode className="text-2xl lg:text-5xl" />,
  mobile: <MdAppShortcut className="text-2xl lg:text-5xl" />,
  design: <SiMaterialdesignicons className="text-2xl lg:text-5xl" />,
};
const services = servicesData as ServiceInfo[];

const ServicesPage = () => {
  return (
    <div className="w-full">
      <PageTitle name="SERVICES" />
      <div className="w-full flex flex-col my-4 md:my-6 md:flex-row justify-center gap-6">
        {services.map((service) => (
          <ServicessCard
            key={service.id}
            icon={serviceIconMap[service.iconKey]}
            service_title={service.service_title}
            service_details={service.service_details}
          />
        ))}
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
