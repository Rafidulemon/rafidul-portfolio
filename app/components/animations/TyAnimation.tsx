"use client";

import React from "react";
import { TypeAnimation } from "react-type-animation";

function TyAnimation() {
  return (
    <TypeAnimation
      sequence={[
        "Rafid",
        1500,
        "Web Developer",
        1000,
        "Mobile Developer",
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
