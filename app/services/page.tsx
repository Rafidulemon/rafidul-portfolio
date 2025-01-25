import React from "react";
import PageTitle from "../components/typography/PageTitle";
import ServicessCard from "../components/cards/ServiceCard";
import { MdOutlineCode, MdAppShortcut } from "react-icons/md";
import { SiMaterialdesignicons } from "react-icons/si";
import Link from "next/link";
import Button from "../components/display/Button";
import { Text } from "../components/typography/Text";

const ServicesPage = () => {
  return (
    <div className="w-full pt-16 md:py-20">
      <PageTitle name="SERVICES" />
      <div className="w-full flex flex-col my-4 md:my-6 md:flex-row justify-center gap-6">
          <ServicessCard
            icon={
              <MdOutlineCode className="text-2xl lg:text-5xl" />
            }
            service_title="Web Developement"
            service_details="I specialize in building modern, scalable, and high-performance web applications using cutting-edge technologies. My expertise includes frameworks and tools such as Next.js, React.js, TypeScript, Tailwind CSS, tRPC, Prisma, RESTful APIs, JWT, and Zod. I focus on creating responsive, user-friendly interfaces and efficient backend architectures. By combining best practices in performance optimization, accessibility, and security, I deliver web solutions tailored to meet your business goals while ensuring a seamless user experience."
          />
          <ServicessCard
            icon={
              <MdAppShortcut className="text-2xl lg:text-5xl"/>
            }
            service_title="Mobile App Developement"
            service_details="I design and develop high-performance mobile applications for Android and iOS platforms, leveraging Native Android and React Native. My expertise allows me to create both platform-specific and cross-platform apps that deliver seamless user experiences. From integrating backend services using REST APIs and GraphQL to ensuring high scalability and efficiency, I craft mobile solutions that meet app store requirements while aligning with your business objectives."
          />
          <ServicessCard
            icon={
              <SiMaterialdesignicons
                className="text-2xl lg:text-5xl"
              />
            }
            service_title="UI/UX Design"
            service_details="I craft intuitive and visually stunning UI/UX designs that elevate the user experience. With tools like Figma and Adobe XD, I create wireframes, prototypes, and interactive designs that bring ideas to life. My focus is on creating designs that are both aesthetically pleasing and functional, ensuring usability, accessibility, and engagement while aligning with your brand’s identity."
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
