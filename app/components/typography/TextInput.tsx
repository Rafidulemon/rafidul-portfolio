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
  name?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export const TextInput: React.FC<TextInputProps> = (props) => {
  const {
    isRequired = true,
    isLabelBold,
    value,
    placeholder = "",
    label = "",
    color = "#111111",
    isFullWidth = false,
    className = "",
    dataCy = "",
    name,
    type = "text",
    onChange,
    error,
  } = props;

  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) onChange(event);
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
        type={type}
        name={name}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`text-white border rounded-lg px-3 py-2 text-[12px] md:text-[16px] focus:outline-none focus:border-cyan-900 ${
          error ? 'border-red-500' : 'border-cyan-500'
        } ${className}`}
        style={{ backgroundColor }}
        data-cy={dataCy}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>} {/* Display error message */}
    </Flex>
  );
};
