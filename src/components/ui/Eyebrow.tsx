import { cn } from "@/lib/utils";

export default function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-full bg-rose-light px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-wine",
        className
      )}
    >
      {children}
    </span>
  );
}
