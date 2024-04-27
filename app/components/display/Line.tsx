type Props = {
  className?: string;
  dataCy?: string;
  direction?: "horizontal" | "vertical";
  widthValue?: string;
  heightValue?: string;
};

export function Line(props: Props) {
  const {
    className,
    dataCy,
    direction = "horizontal",
    widthValue = "100%",
    heightValue,
  } = props;

  if (direction === "horizontal") {
    return (
      <div
        className= {`border-b-[2px] border-black ${className}`}
        style={{ width: widthValue }}
        data-cy={dataCy}
      />
    );
  }
  return (
    <div
      className={`border-r-[2px] border-black ${className}`}
      style={{ height: heightValue }}
    ></div>
  );
}
