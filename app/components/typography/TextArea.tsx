import { type FieldError, type UseFormRegister } from "react-hook-form";
import { Flex } from "../layout/Flex";
import { Text } from "../typography/Text";
export type Props = {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  label?: string;
  isLabelBold?: boolean;
  placeholder?: string;
  name?: string;
  register?: UseFormRegister<any>;
  value?: string;
  isRequired?: boolean;
  isDisable?: boolean;
};
export const TextArea = (props: Props) => {
  const {
    isRequired = true,
    value,
    onChange,
    className,
    label,
    isLabelBold,
    name = "",
    register,
    placeholder,
  } = props;
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
              className="pl-1 text-[12px] md:text-[14px] lg:text-[18px] xl:text-[22px] text-red-600"
            />
          )}
        </Flex>
      )}

      <textarea
        value={value}
        onChange={onChange}
        {...register?.(name)}
        style={{ resize: "none" }}
        className={`border border-cyan-500 bg-[#111111] text-[12px] md:text-[14px] lg:text-[18px] xl:text-[22px] rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-900 text-white ${className}`}
        placeholder={placeholder}
      ></textarea>
    </Flex>
  );
};
