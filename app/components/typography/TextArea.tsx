import { UseFormRegister, type FieldError } from "react-hook-form"

type Props = {
  className?: string;
  isRequired?: boolean;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  value?: string;
  error?: FieldError | undefined;
  id?: string;
  height?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  register?: UseFormRegister<any>;
};

function TextArea(props: Props) {
  const {
    id,
    name = "name",
    register,
    className,
    isRequired = false,
    label,
    defaultValue,
    placeholder,
    value,
    error,
    height,
    onChange,
  } = props;


  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex flex-row gap-[5px] mb-2">
        <label className="text-[16px] font-bold text-primary_dark dark:text-white">{label}</label>
        {isRequired && <span className="text-[16px] font-bold text-tertiary">*</span>}
      </div>
      <textarea
        id={id}
        className={`text-top text-black bg-white dark:bg-black dark:text-white border rounded-lg px-3 py-2 text-[12px] md:text-[16px] focus:outline-none focus:border-cyan-900 ${
          error ? "border-tertiary" : "border-primary"
        } ${className}`}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...register?.(name)}
      />
      {error && <div className="text-[14px] text-tertiary">{error.message}</div>}
    </div>
  );
}

export default TextArea;