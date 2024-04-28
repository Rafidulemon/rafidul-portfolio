import React from "react";
import TyAnimation from "./components/animations/TyAnimation";
import Link from "next/link";
import Button from "./components/display/Button";
import { Text } from "./components/typography/Text";
import MotionDiv from "./components/animations/MotionDiv";
import { Line } from "./components/display/Line";
import ServicessCard from "./components/cards/ServiceCard";
import { MdOutlineCode, MdAppShortcut } from "react-icons/md";
import { SiMaterialdesignicons } from "react-icons/si";
import ProjectsCard from "./components/cards/ProjectsCard";
import SkillBar from "./components/animations/SkillBar";

const HeroSection = () => {
  return (
    <section className="py-16">
      <div className="grid grid-cols-12">
        <MotionDiv
          src="/images/hero-image.png"
          isTransparentBG
          className="col-span-12 place-self-center md:hidden"
          isRoundedImage
          height_width={150}
        />
        <div className="mt-4 md:mt-6 lg:mt-10 xl:mt-14 sm:col-span-12 md:col-span-7 place-self-start justify-self-start">
          <h1 className="text-white text-center md:text-left mb-4 lg:mb-8 xl:mb-12 sm:text-[20px] md:text-3xl lg:text-6xl xl:text-8xl sm:leading-6 lg:leading-normal font-extrabold">
            <span className="text-cyan-500 bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Hello, I&apos;m{" "}
            </span>
            <br></br>
            <TyAnimation />
          </h1>
          <p className="text-[#ADB7BE] sm:text-[12px] mb-4 md:mb-6 lg:mb-10 xl:mb-14 md:text-md lg:text-lg xl:text-2xl sm:leading-[20px] md:leading-normal text-justify">
            Crafted by a skilled Software Engineer, specializing in Mobile App
            Development and Web Development, the digital experiences by this
            innovative mind blend technology and creativity seamlessly.
            Dedicated to delivering exceptional solutions, this talent strives
            to make a meaningful impact through their work.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link href="/contact">
              <Button theme="primary">
                <Text
                  text="Contact me"
                  className="text-[12px] md:text-[16px] mx-4"
                />
              </Button>
            </Link>
            <Link href="/">
              <Button theme="secondary">
                <Text
                  text="Download CV"
                  className="text-[12px] md:text-[16px]"
                />
              </Button>
            </Link>
          </div>
        </div>
        <MotionDiv
          src="/images/hero-image.png"
          isTransparentBG
          className="md:col-span-5 place-self-end hidden md:flex md:w-[250px] lg:w-[400px] xl:w-[550px]"
          isRoundedImage
        />
      </div>
      <div className="w-full sm:my-6 md:my-10 lg:my-14 xl:my-20">
        <div className="w-full flex flex-col mb-4 md:mb-6 lg:mb-8 xl:mb-10 items-center justify-center px-[80px] md:px-[250px] lg:px-[500px] xl:px-[650px]">
          <Line className="w-full border-cyan-500" />
          <Text text="My Skills" isNosifer className="text-[20px] md:text-[30px] lg:text-[40px] xl:text-[48px]" />
          <Line className="w-full border-cyan-500" />
        </div>
        <div className="flex flex-col gap-6 items-center">
          <div className="w-full flex flex-row gap-10 md:w-[350px] lg:w-[550px] xl:w-[700px]">
            <div className="w-full">
              <SkillBar label="Java" level={65} />
              <SkillBar label="python" level={55} />
              <SkillBar label="Javascript" level={80} />
            </div>
            <div className="w-full">
              <SkillBar label="Next.js" level={85} />
              <SkillBar label="React.js" level={60} />
              <SkillBar label="Angular.js" level={50} />
            </div>
          </div>
          <div className="w-full flex flex-row gap-10 md:w-[350px] lg:w-[550px] xl:w-[700px]">
            <div className="w-full">
              <SkillBar label="Java" level={65} />
              <SkillBar label="python" level={70} />
              <SkillBar label="Javascript" level={80} />
            </div>
            <div className="w-full">
              <SkillBar label="Figma" level={85} />
              <SkillBar label="Adobe XD" level={60} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center sm:mb-6 md:mb-10 lg:mb-14 xl:mb-20">
        <div className="w-full flex flex-col mb-10 items-center justify-center px-[80px] md:px-[250px] lg:px-[500px] xl:px-[650px]">
          <Line className="w-full border-cyan-500" />
          <Text text="My Services" isNosifer className="text-[20px] md:text-[30px] lg:text-[40px] xl:text-[48px]" />
          <Line className="w-full border-cyan-500" />
        </div>
        <div className="w-full flex flex-col md:flex-row justify-center gap-6">
          <ServicessCard
            icon={<MdOutlineCode className="text-2xl lg:text-5xl"/>}
            service_title="Front-End Developement"
            service_details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse libero officiis illum error, saepe quas eum obcaecati? Commodi tenetur quasi eligendi est! Cumque aspernatur ipsum soluta doloribus, reiciendis laborum! Corporis?"
          />
          <ServicessCard
            icon={<MdAppShortcut className="text-2xl lg:text-5xl" />}
            service_title="Mobile App Developement"
            service_details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse libero officiis illum error, saepe quas eum obcaecati? Commodi tenetur quasi eligendi est! Cumque aspernatur ipsum soluta doloribus, reiciendis laborum! Corporis?"
          />
          <ServicessCard
            icon={<SiMaterialdesignicons className="text-2xl lg:text-5xl"/>}
            service_title="UI/UX Design"
            service_details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse libero officiis illum error, saepe quas eum obcaecati? Commodi tenetur quasi eligendi est! Cumque aspernatur ipsum soluta doloribus, reiciendis laborum! Corporis?"
          />
        </div>
        <Link
          href={"/services"}
          className="flex md:flex-row items-center justify-center mt-10"
        >
          <Text text="See More..." className="text-cyan-200 xl:text-[12px] xl:text-[16px] xl:text-[20px] xl:text-[24px]" />
        </Link>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col mb-10 items-center justify-center px-[80px] md:px-[250px] lg:px-[500px] xl:px-[650px]">
          <Line className="w-full border-cyan-500" />
          <Text text="My Projects" isNosifer className="text-[20px] md:text-[30px] lg:text-[40px] xl:text-[48px]" />
          <Line className="w-full border-cyan-500" />
        </div>
        <div className="w-full flex flex-col gap-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <ProjectsCard
              src="/images/projects/alizaAi.jpg"
              project_title="Virtual Assistant"
              project_details="Details about the project will be added here."
            />
            <ProjectsCard
              src="/images/projects/portfolio-web.png"
              project_title="Portfolio Website"
              project_details="Details about the project will be added here."
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <ProjectsCard
              src="/images/projects/hr-mgt.jpg"
              project_title="HR Management App"
              project_details="Details about the project will be added here."
            />
            <ProjectsCard
              src="/images/projects/food-delivery-web.png"
              project_title="Food Delivery App"
              project_details="Details about the project will be added here."
            />
            <ProjectsCard
              src="/images/projects/ecom-website.png"
              project_title="E-Commerce Website"
              project_details="Details about the project will be added here."
            />
          </div>
          <Link
            href={"/projects"}
            className="flex flex-row items-center justify-center"
          >
            <Text text="See More..." className="text-cyan-200 text-[12px] md:text-[16px] lg:text-[20px] xl:text-[24px]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
