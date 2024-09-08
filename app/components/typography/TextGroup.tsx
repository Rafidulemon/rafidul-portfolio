import React, { useState } from "react";
import { Text } from "./Text";

type TextInputProps = {
  value?: string;
  label?: string;
  className?: string;
};

export const TextGroup = (props: TextInputProps) => {
  const {
    value = "",
    label = "",
    className = "",
  } = props;

  return (
    <div className={`text-group flex flex-col gap-2 items-start ${className}`}>
        <Text text= {label} isBold/>
        <Text text= {value}/>
    </div>
  );
};
