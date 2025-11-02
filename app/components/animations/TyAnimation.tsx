"use client";

import React from "react";
import { TypeAnimation } from "react-type-animation";

const TyAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        "Md. Rafidul Islam",
        1500,
        "Web Developer",
        1000,
        "Software Engineer",
        1000,
        "Mobile App Developer",
        1000,
        "UI/UX Designer",
        1000,
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
    />
  );
}

export default TyAnimation;
