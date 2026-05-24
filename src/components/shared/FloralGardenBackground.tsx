import Image from "next/image";

interface FloatingFlower {
  top: string;
  left: string;
  size: number;
  opacity: number;
  blur: number;
  drift: "a" | "b" | "c";
  duration: number;
  delay: number;
  rotate: number;
  flipX?: boolean;
}

const COVER_FLOWERS: FloatingFlower[] = [
  { top: "6%", left: "4%", size: 100, opacity: 0.24, blur: 4.5, drift: "a", duration: 16, delay: 0, rotate: -12 },
  { top: "18%", left: "72%", size: 130, opacity: 0.2, blur: 5, drift: "b", duration: 20, delay: 2, rotate: 18, flipX: true },
  { top: "55%", left: "8%", size: 90, opacity: 0.22, blur: 4, drift: "c", duration: 18, delay: 1, rotate: 8 },
  { top: "68%", left: "65%", size: 110, opacity: 0.21, blur: 5, drift: "a", duration: 22, delay: 3, rotate: -20, flipX: true },
  { top: "35%", left: "38%", size: 70, opacity: 0.18, blur: 5.5, drift: "b", duration: 24, delay: 4, rotate: 45 },
  { top: "82%", left: "28%", size: 85, opacity: 0.2, blur: 4.5, drift: "c", duration: 19, delay: 1.5, rotate: -8 },
];

const PAGE_FLOWERS: FloatingFlower[] = [
  { top: "2%", left: "5%", size: 340, opacity: 0.72, blur: 5, drift: "a", duration: 20, delay: 0, rotate: -15 },
  { top: "4%", left: "78%", size: 235, opacity: 0.92, blur: 4.5, drift: "b", duration: 18, delay: 2, rotate: 22, flipX: true },
  { top: "12%", left: "42%", size: 340, opacity: 0.87, blur: 5.5, drift: "c", duration: 24, delay: 1, rotate: 30 },
  { top: "22%", left: "88%", size: 235, opacity: 0.99, blur: 5, drift: "a", duration: 21, delay: 3, rotate: -10, flipX: true },
  { top: "28%", left: "12%", size: 235, opacity: 0.21, blur: 4.5, drift: "b", duration: 17, delay: 0.5, rotate: 12 },
  { top: "38%", left: "55%", size: 510, opacity: 0.78, blur: 5.5, drift: "c", duration: 23, delay: 4, rotate: -25 },
  { top: "48%", left: "3%", size: 340, opacity: 0.22, blur: 4.5, drift: "a", duration: 19, delay: 2.5, rotate: 8 },
  { top: "52%", left: "70%", size: 340, opacity: 0.99, blur: 5, drift: "b", duration: 22, delay: 1, rotate: 18, flipX: true },
  { top: "62%", left: "35%", size: 340, opacity: 0.99, blur: 5.5, drift: "c", duration: 25, delay: 3.5, rotate: -18 },
  { top: "68%", left: "82%", size: 235, opacity: 0.99, blur: 5, drift: "a", duration: 18, delay: 0.8, rotate: 14, flipX: true },
  { top: "78%", left: "15%", size: 340, opacity: 0.99, blur: 4.5, drift: "b", duration: 21, delay: 2, rotate: -8 },
  { top: "85%", left: "50%", size: 235, opacity: 0.18, blur: 5.5, drift: "c", duration: 20, delay: 4.5, rotate: 20 },
  { top: "92%", left: "72%", size: 235, opacity: 0.6, blur: 4.5, drift: "a", duration: 17, delay: 1.2, rotate: -12, flipX: true },
  { top: "96%", left: "8%", size: 565, opacity: 0.19, blur: 5, drift: "b", duration: 23, delay: 3, rotate: 6 },
];

interface FloralGardenBackgroundProps {
  flowerImage: string;
  variant?: "cover" | "page";
}

function FlowerPetal({ flower, flowerImage }: { flower: FloatingFlower; flowerImage: string }) {
  return (
    <div
      className={`floral-garden__petal floral-garden__petal--${flower.drift}`}
      style={{
        top: flower.top,
        left: flower.left,
        width: flower.size,
        height: flower.size,
        opacity: flower.opacity,
        filter: `blur(${flower.blur}px)`,
        animationDuration: `${flower.duration}s`,
        animationDelay: `${flower.delay}s`,
      }}
    >
      <div
        className="relative h-full w-full"
        style={{
          transform: `rotate(${flower.rotate}deg)${flower.flipX ? " scaleX(-1)" : ""}`,
        }}
      >
        <Image src={flowerImage} alt="" fill className="object-contain" sizes={`${flower.size}px`} />
      </div>
    </div>
  );
}

export function FloralGardenBackground({
  flowerImage,
  variant = "page",
}: FloralGardenBackgroundProps) {
  const flowers = variant === "cover" ? COVER_FLOWERS : PAGE_FLOWERS;

  return (
    <div
      aria-hidden
      className={`floral-garden pointer-events-none absolute inset-0 overflow-hidden ${
        variant === "page" ? "floral-garden--page min-h-full w-full" : ""
      }`}
    >
      {flowers.map((flower, index) => (
        <FlowerPetal key={index} flower={flower} flowerImage={flowerImage} />
      ))}
    </div>
  );
}
