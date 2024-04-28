type Props = {
    text: string;
    isTitleVisible?: boolean;
    className?: string;
    isNosifer?: boolean;
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
      isBold = false,
      dataCy,
      isRequired = false,
      onClick,
    } = props;
    return (
      <span
        className={`whitespace-normal  ${className} ${
            isNosifer ? "font-nosifer" : "font-mplus_1p"
          } ${
          isBold && "font-bold"
        } text-white`}
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
  