"use client";
import React, { useEffect, useState } from "react";
import TyAnimation from "../animations/TyAnimation";
import Link from "next/link";
import Button from "../display/Button";
import { Text } from "../typography/Text";
import MotionDiv from "../animations/MotionDiv";
import FlashScreen from "../FlashScreen";
import HeroAskAI from "../ai/HeroAskAI";
import SkillsSection from "../skills/SkillsSection";
import ServicesSection from "../services/ServicesSection";
import ProjectsSection from "../projects/ProjectsSection";
import type { AboutInfo, ProjectInfo, ServiceInfo, SkillInfo } from "@/types/content";

type HomeProps = {
  about: AboutInfo;
  skills: SkillInfo[];
  services: ServiceInfo[];
  projects: ProjectInfo[];
};

const HomePage = ({ about, skills, services, projects }: HomeProps) => {
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
                {about.summary}
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
              <HeroAskAI />
            </div>
            <MotionDiv
              src="/images/new_dp.png"
              isTransparentBG
              className="md:col-span-5 place-self-center mt-6 hidden md:flex md:w-[150px] lg:w-[220px] xl:w-[250px]"
              
            />
          </div>

          {/* Skills */}
          <SkillsSection skills={skills} />

          {/* Services */}
          <ServicesSection services={services} featuredOnly />

          {/* Projects */}
          <ProjectsSection projects={projects} compact />
        </div>
      )}
    </section>
  );
};

export default HomePage;
