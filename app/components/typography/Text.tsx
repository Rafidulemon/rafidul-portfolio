type Props = {
    text: string;
    isTitleVisible?: boolean;
    className?: string;
    isNosifer?: boolean;
    isPoppins?: boolean;
    isCode?: boolean;
    isBold?: boolean;
    dataCy?: string;
    isRequired?: boolean;
    onClick?: () => void;
  };
  
  export const Text = (props: Props) => {
    const {
      text,
      isTitleVisible = false,
      className,
      isNosifer = false,
      isPoppins = false,
      isCode = false,
      isBold = false,
      dataCy,
      isRequired = false,
      onClick,
    } = props;
    return (
      <span
        className={`whitespace-normal  ${className} ${
            isNosifer ? "font-nosifer" : isPoppins ? "font-poppins" : isCode ? "font-fira_code" : "font-mplus_1p"
          } ${
          isBold && "font-bold"
        }`}
        title={isTitleVisible ? text : undefined}
        data-cy={dataCy}
        onClick={onClick}
      >
        {text}
        {isRequired && (
          <Text
            text="*"
            isBold
            className="pl-2 text-cast md:text-[14px] lg:text-[18px] xl:text-[22px]"
          />
        )}
      </span>
    );
  };
  