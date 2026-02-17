import { ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export default function Container({
  children,
  fullWidth = false,
  className,
}: ContainerProps) {
  if (fullWidth) {
    return <div className={clsx("w-full py-32", className)}>{children}</div>;
  }

  return (
    <div className={clsx("max-w-6xl mx-auto px-6 py-32", className)}>
      {children}
    </div>
  );
}
