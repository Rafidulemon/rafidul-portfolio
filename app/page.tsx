"use client";
import React, { useEffect, useState } from "react";
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
import FlashScreen from "./components/FlashScreen";
import projectsData from "./data/projects.json";
import skillData from "./data/skills.json";
import servicesData from "./data/services.json";
import Image from "next/image";
import { ServiceInfo } from "@/types/content";

const serviceIconMap: Record<ServiceInfo["iconKey"], JSX.Element> = {
  web: <MdOutlineCode className="text-2xl lg:text-5xl" />,
  mobile: <MdAppShortcut className="text-2xl lg:text-5xl" />,
  design: <SiMaterialdesignicons className="text-2xl lg:text-5xl" />,
};

const services = servicesData as ServiceInfo[];

const HomePage = () => {
  const [showPersonalProjects, setShowPersonalProjects] = useState(true);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (hasVisited) {
      setShowPopup(false);
    }
    if (!hasVisited) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        localStorage.setItem("hasVisited", "true");
      }, 3000);
    }
  }, []);

  const currentProjects = projectsData.filter((project: { category: string }) =>
    showPersonalProjects
      ? project.category === "personal"
      : project.category === "professional"
  );

  return (
    <section>
      {showPopup && <FlashScreen />}

      {!showPopup && (
        <div>
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
                <div className="dark:text-white text-black">
                  <TyAnimation />
                </div>
              </h1>
              <p className="dark:text-[#ADB7BE] text-gray-700 text-[14px] md:text-[24px] mb-4 md:mb-6 lg:mb-10 xl:mb-14 sm:leading-[20px] md:leading-normal text-justify">
                Crafted by a skilled Software Engineer, specializing in Mobile
                App Development and Web Development, the digital experiences by
                this innovative mind blend technology and creativity seamlessly.
                Dedicated to delivering exceptional solutions, this talent
                strives to make a meaningful impact through their work.
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
                <a href="md_rafidul_islam_resume.pdf" download="Md. Rafidul Islam Resume.pdf">
                  <Button theme="secondary">
                    <Text
                      text="Download CV"
                      className="text-[12px] md:text-[16px] py-[3px] md:py-0"
                    />
                  </Button>
                </a>
              </div>
            </div>
            <MotionDiv
              src="/images/new_dp.png"
              isTransparentBG
              className="md:col-span-5 place-self-center mt-6 hidden md:flex md:w-[150px] lg:w-[220px] xl:w-[250px]"
              isRoundedImage
            />
          </div>

          {/* Skills */}
          <div className="w-full sm:my-6 md:my-10 lg:my-14 xl:my-20">
            <div className="w-full flex flex-col mb-4 md:mb-6 lg:mb-8 xl:mb-10 items-center justify-center px-[80px] md:px-[250px] lg:px-[500px] xl:px-[650px]">
              <Line className="w-full border-cyan-500" />
              <Text
                text="My Skills"
                isNosifer
                className="dark:text-white text-primary_dark text-[20px] md:text-[30px] lg:text-[40px] xl:text-[48px]"
              />
              <Line className="w-full border-cyan-500" />
            </div>
            <div className="flex flex-col items-center">
            {skillData.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mb-6 md:mb-10 lg:mb-14 xl:mb-20 md:w-[350px] lg:w-[550px] xl:w-[700px]">
                {skillData.map((skill) => (
                  <Image
                    key={skill.id}
                    src={skill.icon}
                    alt={`${skill.skill_name} icon`}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain md:h-12 md:w-12 lg:h-[60px] lg:w-[60px] rounded-md"
                  />
                ))}
              </div>
            )}
            </div>

            {skillData.length > 0 && (
              <div className="flex flex-col gap-6 items-center">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 md:w-[350px] lg:w-[550px] xl:w-[700px]">
                  {skillData.map((skill) => (
                    <div key={skill.id} className="w-full">
                      <SkillBar
                        label={skill.skill_name}
                        level={skill.percentage}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Services */}
          <div className="w-full flex flex-col items-center sm:mb-6 md:mb-10 lg:mb-14 xl:mb-20">
            <div className="w-full flex flex-col mb-10 items-center justify-center px-[80px] md:px-[250px] lg:px-[500px] xl:px-[650px]">
              <Line className="w-full border-cyan-500" />
              <Text
                text="My Services"
                isNosifer
                className="text-primary_dark dark:text-white text-[20px] md:text-[30px] lg:text-[40px] xl:text-[48px]"
              />
              <Line className="w-full border-cyan-500" />
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-6">
              {services.map((service) => (
                <ServicessCard
                  key={service.id}
                  icon={serviceIconMap[service.iconKey]}
                  service_title={service.service_title}
                  service_details={service.service_details}
                />
              ))}
            </div>
            <Link
              href={"/services"}
              className="flex md:flex-row items-center justify-center mt-10"
            >
              <Text
                text="See More..."
                className="text-primary dark:text-cyan-200 xl:text-[12px] xl:text-[16px] xl:text-[20px] xl:text-[24px]"
              />
            </Link>
          </div>

          {/* Projects */}
          <div className="w-full">
            <div className="w-full flex flex-col items-center justify-center px-[80px] md:px-[250px] lg:px-[500px] xl:px-[650px]">
              <Line className="w-full border-cyan-500" />
              <Text
                text="My Projects"
                isNosifer
                className="text-primary_dark dark:text-white text-[20px] md:text-[30px] lg:text-[40px] xl:text-[48px]"
              />
              <Line className="w-full border-cyan-500" />
            </div>

            {/* Tabs */}
            <div className="w-full flex flex-row items-center justify-center gap-4 md:gap-10 my-6">
              <button
                className={`${
                  showPersonalProjects
                    ? "bg-primary text-white py-1 px-4 rounded-xl"
                    : "border border-primary text-primary dark:text-white rounded-xl py-1 px-4"
                } text-[16px] md:text-[24px] focus:outline-none`}
                onClick={() => setShowPersonalProjects(true)}
              >
                Personal Projects
              </button>

              <button
                className={`${
                  !showPersonalProjects
                    ? "bg-primary text-white py-1 px-4 rounded-xl"
                    : "border border-primary text-primary dark:text-white rounded-xl py-1 px-4"
                } text-[16px] md:text-[24px] focus:outline-none`}
                onClick={() => setShowPersonalProjects(false)}
              >
                Professional Projects
              </button>
            </div>

            {/* Project Cards */}
            <div className="w-full flex flex-col gap-10">
              <div className="flex flex-wrap items-center justify-center gap-10">
                {currentProjects.map((project) => (
                  <ProjectsCard
                    key={project.id}
                    src={project.src}
                    project_title={project.project_title}
                    project_details={project.project_details}
                    github_link={project.github_link || ""}
                    live_link={project.live_link || ""}
                    stack={project.stack || []}
                  />
                ))}
              </div>

              <Link
                href={"/projects"}
                className="flex flex-row items-center justify-center"
              >
                <Text
                  text="See More..."
                  className="text-primary dark:text-cyan-200 text-[16px] lg:text-[20px] xl:text-[24px]"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomePage;
