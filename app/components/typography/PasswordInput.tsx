// app/components/typography/PasswordInput.tsx
import React, { useState } from "react";
import { Flex } from "../layout/Flex";
import { Text } from "./Text";

type PasswordInputProps = {
  value?: string;
  placeholder?: string;
  label?: string;
  color?: string;
  isFullWidth?: boolean;
  isRequired?: boolean;
  isLabelBold?: boolean;
  className?: string;
  dataCy?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PasswordInput = (props: PasswordInputProps) => {
  const {
    isRequired = true,
    isLabelBold,
    value = "",
    color = "#111111",
    placeholder = "",
    label = "",
    isFullWidth = false,
    className = "",
    dataCy = "",
    name,
    onChange,
  } = props;

  const [inputValue, setInputValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) onChange(event);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const backgroundColor = color;

  return (
    <Flex direction="col" gap="10px" className={`w-full ${className}`}>
      <Flex direction="row" className="w-full" gap="0px">
        {label && (
          <Text
            text={label}
            className={`text-white text-[12px] md:text-[14px] lg:text-[18px] xl:text-[22px] ${
              isLabelBold ? "font-extrabold" : "font-medium"
            }`}
          />
        )}
        {isRequired && (
          <Text
            text="*"
            isBold
            className="pl-1 text-[12px] md:text-[16px] text-red-600"
          />
        )}
      </Flex>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`text-white border border-cyan-500 rounded-lg px-3 py-2 text-[12px] md:text-[16px] focus:outline-none focus:border-cyan-900 w-full ${className}`}
          data-cy={dataCy}
          style={{ backgroundColor }}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-2 text-white"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </Flex>
  );
};
