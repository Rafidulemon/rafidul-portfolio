import React from "react";
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

function page() {
  return (
    <div className="w-full">
      <PageTitle name="ABOUT ME" />
      <Grid colCount={3} className="w-full mt-[60px]">
        <div className="flex flex-col justify-start">
          <Text
            text="Md. Rafidul Islam"
            isBold
            className="text-[24px] text-cyan-300 mb-4"
          />
          <p className="text-[#ADB7BE] text-[20px] mb-10 text-justify">
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
                className="mt-1 inline-block align-middle"
              />
            </div>
            <div>
              <FaPhoneVolume
                size={18}
                color="#00BCD4"
                className="mr-4 inline-block align-middle"
              />
              <Text
                text="+8801111111111"
                className="mt-1 inline-block align-middle"
              />
            </div>
            <div>
              <MdOutlineEmail
                size={24}
                color="#00BCD4"
                className="mr-4 inline-block align-middle"
              />
              <Text
                text="rafidul@example.com"
                className="mt-1 inline-block align-middle"
              />
            </div>
            <Link href={"/contact"} className="mt-4">
              <Button theme="primary" className="w-[250px]">
                <Text text="Get in Touch" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-center mt-16">
          <div>
            <MotionDiv
              src="/images/ai-image-1.png"
              height_width={250}
              isCircularBorder
              isTransparentBG
              isRoundedImage
            />
            <div className="flex w-full flex-row items-center justify-center mt-8 gap-x-8 mb-10">
              <a href="https://www.facebook.com/" target="_blank">
                <FaFacebook size={30} color="#1877F2" />
              </a>
              <a href="https://www.facebook.com/" target="_blank">
                <FaInstagram size={30} color="#E1306C" />
              </a>
              <a href="https://www.facebook.com/" target="_blank">
                <FaGithub size={30} />
              </a>
              <a href="https://www.facebook.com/" target="_blank">
                <FaTwitter size={30} color="#1DA1F2" />
              </a>
              <a href="https://www.facebook.com/" target="_blank">
                <FaLinkedin size={30} color="#0077B5" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col alighItems-end justify-start">
          <Text
            text="My Professional Skills"
            isBold
            className="text-[24px] text-cyan-300 mb-4"
          />
          <p className="text-[#ADB7BE] text-[20px] mb-10 text-justify">
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
          <Link href={"/projects"} className="flex flex-row items-center justify-center">
            <Text text="See More..." className="text-cyan-200 text-[24px]" />
          </Link>
        </div>
      </div>
      <div className="w-full mt-10">
        <Details />
      </div>
    </div>
  );
}

export default page;
