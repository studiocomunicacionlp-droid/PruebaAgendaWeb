import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhotoFrameProps {
  src?: string;
  alt: string;
  className?: string;
}

export default function PhotoFrame({ src, alt, className }: PhotoFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] shadow-soft",
        className
      )}
    >
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-rose-strong via-wine to-wine-dark">
          <span className="font-script text-6xl text-rose-light/90">LP</span>
        </div>
      )}
    </div>
  );
}
