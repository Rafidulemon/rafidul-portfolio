import { type ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  direction: "row" | "col";
  justifyContent?: "start" | "center" | "end" | "between" | "around";
  alignItems?: "start" | "center" | "end" | "flex-end";
  className?: string;
  wrap?: boolean;
  gap?: string;
  dataCy?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export function Flex(props: Props) {
  const {
    id,
    children,
    className,
    direction,
    justifyContent = direction === "row" ? "start" : "center",
    alignItems = direction === "row" ? "center" : "",
    wrap = true,
    gap,
    onClick,
    dataCy,
  } = props;

  return (
    <div
      id={id}
      className={`
            flex
            ${wrap && direction === "row" ? "flex-wrap" : "whitespace-nowrap"}
            flex-${direction}
            justify-${justifyContent}
            items-${alignItems}
            ${direction === "row" ? "gap-[16px]" : "gap-[24px]"}
            ${className}
        `}
      style={{ gap }}
      data-cy={dataCy}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
