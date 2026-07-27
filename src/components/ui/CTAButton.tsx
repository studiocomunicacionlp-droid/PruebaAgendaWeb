import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "dark";
  className?: string;
}

export default function CTAButton({
  href,
  children,
  variant = "primary",
  className,
}: CTAButtonProps) {
  const styles = {
    primary:
      "bg-wine text-cream hover:bg-rose-strong shadow-soft hover:-translate-y-0.5",
    outline:
      "border-2 border-wine text-wine hover:bg-wine hover:text-cream",
    dark: "bg-ink text-cream hover:bg-rose-strong hover:-translate-y-0.5",
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-center font-heading text-base font-semibold transition-all duration-300",
        styles[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
