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
    <div className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-7 place-self-center text-center sm:text-left justify-self-start">
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
            <span className="text-cyan-500 bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Hello, I&apos;m{" "}
            </span>
            <br></br>
            <TyAnimation />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl text-justify">
            Crafted by a skilled Software Engineer, specializing in Mobile App
            Development and Web Development, the digital experiences by this
            innovative mind blend technology and creativity seamlessly.
            Dedicated to delivering exceptional solutions, this talent strives
            to make a meaningful impact through their work.
          </p>
          <div className="flex gap-4">
            <Link href="/contact">
              <Button theme="primary">
                <Text text="Contact me" className="mx-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button theme="secondary">
                <Text text="Download CV" />
              </Button>
            </Link>
          </div>
        </div>
        <MotionDiv
          src="/images/hero-image.png"
          isTransparentBG
          className="col-span-5 place-self-end"
          isRoundedImage
        />
      </div>
      <div className="w-full my-20">
        <div className="w-full flex flex-col mb-10 items-center justify-center px-[650px]">
          <Line className="w-full border-cyan-500" />
          <Text text="My Skills" isNosifer className="text-[48px]" />
          <Line className="w-full border-cyan-500" />
        </div>
        <div className="flex flex-col gap-6 items-center">
          <div className="w-full flex flex-row gap-10 w-[60vh]">
            <div className="w-full">
              <SkillBar label="Java" level={65} />
              <SkillBar label="python" level={70} />
              <SkillBar label="Javascript" level={80} />
            </div>
            <div className="w-full">
              <SkillBar label="Next.js" level={85} />
              <SkillBar label="React.js" level={60} />
              <SkillBar label="Angular.js" level={50} />
            </div>
          </div>
          <div className="w-full flex flex-row gap-10 w-[60vh]">
            <div className="w-full">
              <SkillBar label="Java" level={65} />
              <SkillBar label="python" level={70} />
              <SkillBar label="Javascript" level={80} />
            </div>
            <div className="w-full">
              <SkillBar label="Next.js" level={85} />
              <SkillBar label="React.js" level={60} />
              <SkillBar label="Angular.js" level={50} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-16 flex flex-col items-center">
        <div className="w-full flex flex-col mb-10 items-center justify-center px-[650px]">
          <Line className="w-full border-cyan-500" />
          <Text text="My Services" isNosifer className="text-[48px]" />
          <Line className="w-full border-cyan-500" />
        </div>
        <div className="w-full flex flex-row justify-center gap-6">
          <ServicessCard
            icon={<MdOutlineCode size={40} />}
            service_title="Front-End Developement"
            service_details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse libero officiis illum error, saepe quas eum obcaecati? Commodi tenetur quasi eligendi est! Cumque aspernatur ipsum soluta doloribus, reiciendis laborum! Corporis?"
          />
          <ServicessCard
            icon={<MdAppShortcut size={40} />}
            service_title="Mobile App Developement"
            service_details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse libero officiis illum error, saepe quas eum obcaecati? Commodi tenetur quasi eligendi est! Cumque aspernatur ipsum soluta doloribus, reiciendis laborum! Corporis?"
          />
          <ServicessCard
            icon={<SiMaterialdesignicons size={40} />}
            service_title="UI/UX Design"
            service_details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse libero officiis illum error, saepe quas eum obcaecati? Commodi tenetur quasi eligendi est! Cumque aspernatur ipsum soluta doloribus, reiciendis laborum! Corporis?"
          />
        </div>
        <Link
          href={"/services"}
          className="flex flex-row items-center justify-center mt-10"
        >
          <Text text="See More..." className="text-cyan-200 text-[24px]" />
        </Link>
      </div>
      <div className="w-full my-20">
        <div className="w-full flex flex-col mb-10 items-center justify-center px-[650px]">
          <Line className="w-full border-cyan-500" />
          <Text text="My Projects" isNosifer className="text-[48px]" />
          <Line className="w-full border-cyan-500" />
        </div>
        <div className="w-full flex flex-col gap-10">
          <div className="flex flex-row items-center justify-center gap-10">
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
          <div className="flex flex-row items-center justify-center gap-10">
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
            <Text text="See More..." className="text-cyan-200 text-[24px]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
