"use client";
import React, { useState } from "react";
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

const HomePage = () => {
  const [showPersonalProjects, setShowPersonalProjects] = useState(true);

  const personalProjects = [
    {
      src: "/images/projects/alizaAi.jpg",
      title: "Virtual Assistant",
      details:
        "An AI-powered virtual assistant capable of handling user queries, setting reminders, and performing various tasks.",
      github: "https://github.com/Rafidulemon/myVirtualAssistant",
      link: "#",
    },
    {
      src: "/images/projects/portfolio-web.png",
      title: "Portfolio Website",
      details:
        "A visually stunning and responsive portfolio website showcasing skills, projects, and achievements.",
      github: "https://github.com/Rafidulemon/rafidul-portfolio",
      link: "https://rafidul-portfolio.vercel.app",
    },
    {
      src: "/images/projects/hr_mgt.jpeg",
      title: "HR Management App",
      details:
        "A modern HR management application to handle employee records, payroll, and organizational tasks effectively.",
      github: "https://github.com/Rafidulemon/hr_mgt",
      link: "https://hr-mgt.netlify.app/",
    },
    {
      src: "/images/projects/hospital.jpg",
      title: "Hospital App",
      details:
        "A hospital management web app featuring patient records, doctor schedules, and appointment booking.",
      github: "https://github.com/Rafidulemon/demo_hospital",
      link: "https://demo-hospital-theta.vercel.app",
    },
    {
      src: "/images/projects/career.jpg",
      title: "Carriastic Website",
      details:
        "A carrer development website showcasing various job opportunities and resources for career growth.",
      github: "https://github.com/Rafidulemon/carriastic",
      link: "https://carriasticapp.vercel.app/",
    },
  ];
  
  const professionalProjects = [
    {
      src: "/images/projects/moeguide.png",
      title: "MoeGuide",
      details:
        "A comprehensive guide application featuring detailed itineraries, activities, and location-based recommendations.",
      link: "https://moeguide-app.vercel.app/",
      github: "https://github.com/",
    },
    {
      src: "/images/projects/suiri.png",
      title: "Suirikyou",
      details:
        "A plafrorm for online test and getting results, certificates, and scholarships.",
      link: "https://suirikyou.vercel.app/",
      github: "https://github.com/",
    },
    {
      src: "/images/projects/rag.png",
      title: "Raggie",
      details:
        "An inhouse gpt platform for ai chatting",
      link: "https://raggie-swart.vercel.app/",
      github: "https://github.com/",
    },
    {
      src: "/images/projects/benrimono.png",
      title: "Benrimono",
      details:
        "A platform for user and driver management including live location, calling the driver",
      link: "https://benrimono-api-next.vercel.app",
      github: "https://github.com/",
    },
  ];
  

  const currentProjects = showPersonalProjects
    ? personalProjects
    : professionalProjects;
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
          <p className="text-[#ADB7BE] text-[14px] md:text-[24px] mb-4 md:mb-6 lg:mb-10 xl:mb-14 sm:leading-[20px] md:leading-normal text-justify">
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

      {/* Skills */}
      <div className="w-full sm:my-6 md:my-10 lg:my-14 xl:my-20">
        <div className="w-full flex flex-col mb-4 md:mb-6 lg:mb-8 xl:mb-10 items-center justify-center px-[80px] md:px-[250px] lg:px-[500px] xl:px-[650px]">
          <Line className="w-full border-cyan-500" />
          <Text
            text="My Skills"
            isNosifer
            className="text-white text-white text-[20px] md:text-[30px] lg:text-[40px] xl:text-[48px]"
          />
          <Line className="w-full border-cyan-500" />
        </div>

        <div className="flex flex-col gap-6 items-center">
          <div className="w-full flex flex-row gap-10 md:w-[350px] lg:w-[550px] xl:w-[700px]">
            <div className="w-full">
              <SkillBar label="Javascript" level={80} />
              <SkillBar label="Java" level={50} />
              <SkillBar label="python" level={55} />
            </div>
            <div className="w-full">
              <SkillBar label="TypeScriopt" level={80} />
              <SkillBar label="Next.js" level={85} />
              <SkillBar label="React.js" level={80} />
            </div>
          </div>
          <div className="w-full flex flex-row gap-10 md:w-[350px] lg:w-[550px] xl:w-[700px]">
            <div className="w-full">
              <SkillBar label="Postgres" level={65} />
              <SkillBar label="MySQL" level={60} />
              <SkillBar label="Tailwind CSS" level={85} />
            </div>
            <div className="w-full">
              <SkillBar label="Node.js" level={75} />
              <SkillBar label="Prisma" level={95} />
              <SkillBar label="Git" level={85} />
            </div>
          </div>
          <div className="w-full flex flex-row gap-10 md:w-[350px] lg:w-[550px] xl:w-[700px]">
            <div className="w-full">
              <SkillBar label="tRPC" level={85} />
              <SkillBar label="REST Api" level={65} />
              <SkillBar label="Docker" level={50} />
            </div>
            <div className="w-full">
              <SkillBar label="Git" level={85} />
              <SkillBar label="Figma" level={85} />
              <SkillBar label="Adobe XD" level={60} />
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="w-full flex flex-col items-center sm:mb-6 md:mb-10 lg:mb-14 xl:mb-20">
        <div className="w-full flex flex-col mb-10 items-center justify-center px-[80px] md:px-[250px] lg:px-[500px] xl:px-[650px]">
          <Line className="w-full border-cyan-500" />
          <Text
            text="My Services"
            isNosifer
            className="text-white text-[20px] md:text-[30px] lg:text-[40px] xl:text-[48px]"
          />
          <Line className="w-full border-cyan-500" />
        </div>
        <div className="w-full flex flex-col md:flex-row justify-center gap-6">
          <ServicessCard
            icon={
              <MdOutlineCode className="text-2xl lg:text-5xl" color="#FFFFFF" />
            }
            service_title="Web Developement"
            service_details="I specialize in building modern, scalable, and high-performance web applications using cutting-edge technologies. My expertise includes frameworks and tools such as Next.js, React.js, TypeScript, Tailwind CSS, tRPC, Prisma, RESTful APIs, JWT, and Zod. I focus on creating responsive, user-friendly interfaces and efficient backend architectures. By combining best practices in performance optimization, accessibility, and security, I deliver web solutions tailored to meet your business goals while ensuring a seamless user experience."
          />
          <ServicessCard
            icon={
              <MdAppShortcut className="text-2xl lg:text-5xl" color="#FFFFFF" />
            }
            service_title="Mobile App Developement"
            service_details="I design and develop high-performance mobile applications for Android and iOS platforms, leveraging Native Android and React Native. My expertise allows me to create both platform-specific and cross-platform apps that deliver seamless user experiences. From integrating backend services using REST APIs and GraphQL to ensuring high scalability and efficiency, I craft mobile solutions that meet app store requirements while aligning with your business objectives."
          />
          <ServicessCard
            icon={
              <SiMaterialdesignicons
                className="text-2xl lg:text-5xl"
                color="#FFFFFF"
              />
            }
            service_title="UI/UX Design"
            service_details="I craft intuitive and visually stunning UI/UX designs that elevate the user experience. With tools like Figma and Adobe XD, I create wireframes, prototypes, and interactive designs that bring ideas to life. My focus is on creating designs that are both aesthetically pleasing and functional, ensuring usability, accessibility, and engagement while aligning with your brand’s identity."
          />
        </div>
        <Link
          href={"/services"}
          className="flex md:flex-row items-center justify-center mt-10"
        >
          <Text
            text="See More..."
            className="text-cyan-200 xl:text-[12px] xl:text-[16px] xl:text-[20px] xl:text-[24px]"
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
            className="text-white text-[20px] md:text-[30px] lg:text-[40px] xl:text-[48px]"
          />
          <Line className="w-full border-cyan-500" />
        </div>

        {/* Tabs */}
        <div className="w-full flex flex-row items-center justify-center gap-4 md:gap-10 my-6">
          <button
            className={`${
              showPersonalProjects
                ? "bg-cyan-500 text-white py-1 px-4 rounded-xl"
                : "border border-cyan-500 rounded-xl py-1 px-4"
            } text-[16px] md:text-[24px] focus:outline-none`}
            onClick={() => setShowPersonalProjects(true)}
          >
            Personal Projects
          </button>

          <button
            className={`${
              !showPersonalProjects
                ? "bg-cyan-500 text-white py-1 px-4 rounded-xl"
                : "border border-cyan-500 rounded-xl py-1 px-4"
            } text-[16px] md:text-[24px] focus:outline-none`}
            onClick={() => setShowPersonalProjects(false)}
          >
            Professional Projects
          </button>
        </div>

        {/* Project Cards */}
        <div className="w-full flex flex-col gap-10">
          <div className="flex flex-wrap items-center justify-center gap-10">
            {currentProjects.map((project, index) => (
              <ProjectsCard
                key={index}
                src={project.src}
                project_title={project.title}
                project_details={project.details}
                github_link={project.github}
                live_link={project.link}
              />
            ))}
          </div>

          <Link
            href={"/projects"}
            className="flex flex-row items-center justify-center"
          >
            <Text
              text="See More..."
              className="text-cyan-200 text-[12px] md:text-[16px] lg:text-[20px] xl:text-[24px]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
