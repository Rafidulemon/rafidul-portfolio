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

function aboutPage() {
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
              <a href="https://www.facebook.com/" target="_blank">
                <FaFacebook
                  color="#1877F2"
                  size={20}
                />
              </a>
              <a href="https://www.facebook.com/" target="_blank">
                <FaInstagram
                  color="#E1306C"
                  size={20}
                />
              </a>
              <a href="https://www.facebook.com/" target="_blank">
                <FaGithub
                  color="#FFFFFF"
                  size={20}
                />
              </a>
              <a href="https://www.facebook.com/" target="_blank">
                <FaTwitter
                  color="#1DA1F2"
                  size={20}
                />
              </a>
              <a href="https://www.facebook.com/" target="_blank">
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
          <p className="text-[#ADB7BE] text-[12px] mb-4 text-justify">
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
                text="+8801111111111"
                className="inline-block align-middle text-white text-[12px]"
              />
            </div>
            <div className="mb-2">
              <MdOutlineEmail
                size={18}
                color="#00BCD4"
                className="mr-4 inline-block align-middle"
              />
              <Text
                text="rafidul@example.com"
                className="inline-block align-middle text-white text-[12px]"
              />
            </div>
            <Link href={"/contact"}>
              <Button
                theme="primary"
                className="w-[120px]"
              >
                <Text text="Get in Touch" className="text-[12px] text-white"/>
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
          <p className="text-[#ADB7BE] text-[12px] mb-4 text-justify">
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
                text="+8801111111111"
                className="inline-block align-middle text-white md:text-[14px] lg:text-[16px] xl:text-[18px]"
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
                className="inline-block align-middle text-white md:text-[14px] lg:text-[16px] xl:text-[18px]"
              />
            </div>
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
              <a href="https://www.facebook.com/" target="_blank">
                <FaFacebook
                  color="#1877F2"
                  className="md:text-[24px] md:text-[28px] md:text-[30px]"
                />
              </a>
              <a href="https://www.facebook.com/" target="_blank">
                <FaInstagram
                  color="#E1306C"
                  className="md:text-[24px] md:text-[28px] md:text-[30px]"
                />
              </a>
              <a href="https://www.facebook.com/" target="_blank">
                <FaGithub
                  color="#FFFFFF"
                  className="md:text-[24px] md:text-[28px] md:text-[30px]"
                />
              </a>
              <a href="https://www.facebook.com/" target="_blank">
                <FaTwitter
                  color="#1DA1F2"
                  className="md:text-[24px] md:text-[28px] md:text-[30px]"
                />
              </a>
              <a href="https://www.facebook.com/" target="_blank">
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
      <div className="w-full md:my-14 lg:my-18 xl:my-20">
        <div className="w-full flex flex-col mb-10 items-center justify-center px-[80px] md:px-[250px] lg:px-[500px] xl:px-[650px]">
          <Line className="w-full border-cyan-500" />
          <Text
            text="My Projects"
            isNosifer
            className="text-white text-[20px] md:text-[30px] lg:text-[40px] xl:text-[48px]"
          />
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
            <Text
              text="See More..."
              className="text-cyan-200 md:text-[16px] lg:text-[20px] xl:text-[24px]"
            />
          </Link>
        </div>
      </div>
      <div className="w-full mt-10">
        <Details />
      </div>
    </div>
  );
}

export default aboutPage;
