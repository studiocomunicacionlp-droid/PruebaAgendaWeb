"use client";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "outline-white" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#6B705C] text-white hover:bg-[#5a5f4d] focus:ring-[#6B705C] shadow-sm hover:shadow-md",
  secondary:
    "bg-[#DDBEA9] text-[#3A3A3A] hover:bg-[#c9a896] focus:ring-[#DDBEA9] shadow-sm hover:shadow-md",
  outline:
    "border-2 border-[#6B705C] text-[#6B705C] hover:bg-[#6B705C] hover:text-white focus:ring-[#6B705C]",
  "outline-white":
    "border-2 border-white text-white hover:bg-white hover:text-[#6B705C] focus:ring-white",
  ghost: "text-[#6B705C] hover:bg-[#6B705C]/10 focus:ring-[#6B705C]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...(props as HTMLMotionProps<"button">)}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
export default Button;
