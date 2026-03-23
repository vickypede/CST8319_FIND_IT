import type { ReactNode } from "react";

type Variant = "default" | "elevated" | "interactive";

interface Props {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-white border border-gray-200 rounded-xl shadow-sm",
  elevated: "bg-white border-l-4 border-l-primary border border-gray-200 rounded-lg shadow-md",
  interactive:
    "bg-white border border-gray-200 rounded-xl shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-primary transition-all duration-200 cursor-pointer",
};

export default function Card({ variant = "default", className = "", children, onClick }: Props) {
  return (
    <div className={`${variantStyles[variant]} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
