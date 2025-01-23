"use client";
import React, { useState } from "react";
import { Line } from "../components/display/Line";
import { Text } from "../components/typography/Text";
import { Grid } from "../components/layout/Grid";
import PageTitle from "../components/typography/PageTitle";
import Button from "../components/display/Button";
import MotionDiv from "../components/animations/MotionDiv";
import { FaMapLocationDot, FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import SkillBar from "../components/animations/SkillBar";
import ProjectsCard from "../components/cards/ProjectsCard";
import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import Details from "../components/about-details/Details";
import Link from "next/link";

const AboutPage = () => {
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
    <div className="w-full pt-16 md:py-20">
      <PageTitle name="ABOUT ME" />
      <div className="md:hidden">
        <div className="flex flex-row justify-center mt-8">
          <div>
            <div className="flex flex-row items-center justify-center">
              <MotionDiv
                src="/images/ai-image-1.png"
                isCircularBorder
                isTransparentBG
                isRoundedImage
                className="w-[150px]"
              />
            </div>
            <div className="flex w-full flex-row items-center justify-center mt-4 gap-x-4 mb-4">
              <a href="https://www.facebook.com/rafidul.emon.50" target="_blank">
                <FaFacebook
                  color="#1877F2"
                  size={20}
                />
              </a>
              <a href="https://www.instagram.com/rafidulemon" target="_blank">
                <FaInstagram
                  color="#E1306C"
                  size={20}
                />
              </a>
              <a href="https://github.com/Rafidulemon" target="_blank">
                <FaGithub
                  color="#FFFFFF"
                  size={20}
                />
              </a>
              <a href="https://www.linkedin.com/in/md-rafidul-islam-8b013118b/" target="_blank">
                <FaLinkedin
                  color="#0077B5"
                  size={20}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start text-center mt-4">
          <Text
            text="Md. Rafidul Islam"
            isBold
            className="text-[16px] text-cyan-300 mb-4"
          />
          <p className="text-[#ADB7BE] text-[14px] mb-4 text-justify">
            Crafted by a skilled Software Engineer, specializing in Mobile App
            Development and Web Development, the digital experiences by this
            innovative mind blend technology and creativity seamlessly.
            Dedicated to delivering exceptional solutions, this talent strives
            to make a meaningful impact through their work.
          </p>
          <div className="flex flex-col items-start gap-1">
            <div>
              <FaMapLocationDot
                size={16}
                color="#00BCD4"
                className="mr-4 inline-block align-middle"
              />
              <Text
                text="Patiya, Chittagong, Bangladesh"
                className="inline-block align-middle text-white text-[12px]"
              />
            </div>
            <div>
              <FaPhoneVolume
                size={14}
                color="#00BCD4"
                className="mr-4 inline-block align-middle"
              />
              <Text
                text="+8801990497796"
                className="inline-block align-middle text-white text-[14px]"
              />
            </div>
            <Link href={`mailto:rafidulemon@gmail.com`} className="mb-2">
              <MdOutlineEmail
                size={18}
                color="#00BCD4"
                className="mr-4 inline-block align-middle"
              />
              <Text
                text="rafidulemon@gmail.com"
                className="inline-block align-middle text-white text-[14px]"
              />
            </Link>
            <Link href={"/contact"} className="w-full my-2">
              <Button
                theme="primary"
                className="w-full"
              >
                <Text text="Get in Touch" className="text-[14px] text-white"/>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col alighItems-end justify-start my-4 text-center">
          <Text
            text="My Professional Skills"
            isBold
            className="text-[16px] text-cyan-300 mb-4"
          />
          <p className="text-[#ADB7BE] text-[14px] mb-4 text-justify">
            With expertise spanning web development encompassing JavaScript,
            TypeScript, React.js, Next.js, and database management tools like
            MySQL, MongoDB, and Prisma, alongside mobile app development
            proficiency in Java and Android, I bring a comprehensive skill set
            to the table. Complemented by UI/UX design capabilities utilizing
            Figma and Adobe XD, I am equipped to deliver impactful solutions
            across diverse platforms.
          </p>
          <div className="text-start">
            <SkillBar label="Web Development" level={80} />
            <SkillBar label="Mobile App Development" level={70} />
            <SkillBar label="UI/UX Design" level={60} />
          </div>
        </div>
      </div>
      <Grid colCount={3} className="w-full mt-[60px] hidden md:grid">
        <div className="flex flex-col justify-start">
          <Text
            text="Md. Rafidul Islam"
            isBold
            className="md:text-[20px] lg:text-[22px] xl:text-[24px] text-cyan-300 mb-4"
          />
          <p className="text-[#ADB7BE] md:text-[16px] lg:text-[18px] xl:text-[20px] mb-10 text-justify">
            Crafted by a skilled Software Engineer, specializing in Mobile App
            Development and Web Development, the digital experiences by this
            innovative mind blend technology and creativity seamlessly.
            Dedicated to delivering exceptional solutions, this talent strives
            to make a meaningful impact through their work.
          </p>
          <div className="flex flex-col items-start gap-4">
            <div>
              <FaMapLocationDot
                size={18}
                color="#00BCD4"
                className="mr-4 inline-block align-middle"
              />
              <Text
                text="Patiya, Chittagong, Bangladesh"
                className="inline-block align-middle text-white md:text-[14px] lg:text-[16px] xl:text-[18px]"
              />
            </div>
            <div>
              <FaPhoneVolume
                size={18}
                color="#00BCD4"
                className="mr-4 inline-block align-middle"
              />
              <Text
                text="+8801990497796"
                className="inline-block align-middle text-white md:text-[14px] lg:text-[16px] xl:text-[18px]"
              />
            </div>
            <Link href={`mailto:rafidulemon@gmail.com`}>
              <MdOutlineEmail
                size={24}
                color="#00BCD4"
                className="mr-4 inline-block align-middle"
              />
              <Text
                text="rafidulemon@gmail.com"
                className="inline-block align-middle text-white md:text-[14px] lg:text-[16px] xl:text-[18px]"
              />
            </Link>
            <Link href={"/contact"} className="mt-4">
              <Button
                theme="primary"
                className="md:w-[150px] lg:w-[200px] xl:w-[250px]"
              >
                <Text text="Get in Touch" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-center md:mt-20 lg:mt-18 xl:mt-16">
          <div>
            <div className="flex flex-row items-center justify-center">
              <MotionDiv
                src="/images/ai-image-1.png"
                isCircularBorder
                isTransparentBG
                isRoundedImage
                className="md:w-[150px] lg:w-[200px] xl:w-[250px]"
              />
            </div>
            <div className="flex w-full flex-row items-center justify-center md:mt-4 md:gap-x-4 lg:mt-8 lg:gap-x-8 xl:mt-8 xl:gap-x-8 mb-10">
              <a href="https://www.facebook.com/rafidul.emon.50" target="_blank">
                <FaFacebook
                  color="#1877F2"
                  className="md:text-[24px] md:text-[28px] md:text-[30px]"
                />
              </a>
              <a href="https://www.instagram.com/rafidulemon" target="_blank">
                <FaInstagram
                  color="#E1306C"
                  className="md:text-[24px] md:text-[28px] md:text-[30px]"
                />
              </a>
              <a href="https://github.com/Rafidulemon" target="_blank">
                <FaGithub
                  color="#FFFFFF"
                  className="md:text-[24px] md:text-[28px] md:text-[30px]"
                />
              </a>
              <a href="https://www.linkedin.com/in/md-rafidul-islam-8b013118b/" target="_blank">
                <FaLinkedin
                  color="#0077B5"
                  className="md:text-[24px] md:text-[28px] md:text-[30px]"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col alighItems-end justify-start">
          <Text
            text="My Professional Skills"
            isBold
            className="md:text-[20px] lg:text-[22px] xl:text-[24px] text-cyan-300 mb-4"
          />
          <p className="text-[#ADB7BE] md:text-[16px] lg:text-[18px] xl:text-[20px] mb-10 text-justify">
            With expertise spanning web development encompassing JavaScript,
            TypeScript, React.js, Next.js, and database management tools like
            MySQL, MongoDB, and Prisma, alongside mobile app development
            proficiency in Java and Android, I bring a comprehensive skill set
            to the table. Complemented by UI/UX design capabilities utilizing
            Figma and Adobe XD, I am equipped to deliver impactful solutions
            across diverse platforms.
          </p>
          <div>
            <SkillBar label="Web Development" level={80} />
            <SkillBar label="Mobile App Development" level={70} />
            <SkillBar label="UI/UX Design" level={60} />
          </div>
        </div>
      </Grid>
      <div className="w-full mt-6">
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
      <div className="w-full my-10">
        <Details />
      </div>
    </div>
  );
}

export default AboutPage;
