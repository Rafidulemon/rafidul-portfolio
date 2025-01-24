import React, { forwardRef } from "react";
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

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
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

    const backgroundColor = color;

    return (
      <Flex direction="col" gap="10px" className={`w-full ${className}`}>
        {label && (
          <Flex direction="row" className="w-full" gap="0px">
            <Text
              text={label}
              className={`text-white text-[12px] md:text-[14px] lg:text-[18px] xl:text-[22px] ${
                isLabelBold ? "font-extrabold" : "font-medium"
              }`}
            />
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
          ref={ref} // Forward ref added here
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`text-white border rounded-lg px-3 py-2 text-[12px] md:text-[16px] focus:outline-none focus:border-cyan-900 ${
            error ? "border-red-500" : "border-cyan-500"
          } ${className}`}
          style={{ backgroundColor }}
          data-cy={dataCy}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>} {/* Display error message */}
      </Flex>
    );
  }
);

TextInput.displayName = "TextInput"; // Required for forwardRef components
