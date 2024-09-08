import React, { useState } from "react";
import { Flex } from "../layout/Flex";
import { Text } from "./Text";

type TextInputProps = {
  value?: string;
  placeholder?: string;
  label?: string;
  color?: string;
  isFullWidth?: boolean;
  isRequired?: boolean;
  isLabelBold?: boolean;
  className?: string;
  dataCy?: string;
};

export const TextInput = (props: TextInputProps) => {
  const {
    isRequired = true,
    isLabelBold,
    value = "",
    placeholder = "",
    label = "",
    color = "#111111",
    isFullWidth = false,
    className = "",
    dataCy = ""
  } = props;

  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const backgroundColor = color;

  return (
    <Flex direction="col" gap="10px" className={`w-full ${className}`}>
      {((label && label.length > 0) ?? isRequired) && (
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
      )}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`text-white border border-cyan-500 rounded-lg px-3 py-2 text-[12px] md:text-[16px] focus:outline-none focus:border-cyan-900 ${className}`}
        style={{ backgroundColor }}
        data-cy={dataCy}
      />
    </Flex>
  );
};
