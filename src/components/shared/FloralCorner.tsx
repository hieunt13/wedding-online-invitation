import Image from "next/image";

interface FloralCornerProps {
  flowerImage: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

const positionClasses: Record<FloralCornerProps["position"], string> = {
  "top-left": "top-0 left-0 -translate-x-[15%] -translate-y-[10%]",
  "top-right": "top-0 right-0 translate-x-[15%] -translate-y-[10%] scale-x-[-1]",
  "bottom-left": "bottom-0 left-0 -translate-x-[15%] translate-y-[10%] scale-y-[-1]",
  "bottom-right": "bottom-0 right-0 translate-x-[15%] translate-y-[10%] scale-x-[-1] scale-y-[-1]",
};

export function FloralCorner({ flowerImage, position, className = "" }: FloralCornerProps) {
  return (
    <div
      className={`pointer-events-none absolute z-[1] w-40 h-40 sm:w-52 sm:h-52 opacity-90 ${positionClasses[position]} ${className}`}
      aria-hidden
    >
      <Image src={flowerImage} alt="" fill className="object-contain" sizes="208px" />
    </div>
  );
}
