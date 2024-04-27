import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  colCount?: number;
  className?: string;
  gap?: string;
};

export const Grid = (props: Props) => {
  const { children, colCount = 1, className, gap } = props;

  return (
    <div
      className={`
            gap-grid-gap
            grid
            w-full
            ${className}
        `}
      style={{
        gap,
        gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  );
};
