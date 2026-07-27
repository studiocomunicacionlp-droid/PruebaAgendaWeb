import Image from "next/image";
import { cn, withBasePath } from "@/lib/utils";

interface PhotoFrameProps {
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

export default function PhotoFrame({
  src,
  alt,
  className,
  imgClassName,
}: PhotoFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] shadow-soft",
        className
      )}
    >
      {src ? (
        <Image
          src={withBasePath(src)}
          alt={alt}
          fill
          className={cn("object-cover", imgClassName)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-rose-strong via-wine to-wine-dark">
          <span className="font-script text-6xl text-rose-light/90">LP</span>
        </div>
      )}
    </div>
  );
}
