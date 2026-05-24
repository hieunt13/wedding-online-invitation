import Image from "next/image";

const FLORALS = [
  { src: "/images/flower.png", className: "jmii-page__floral jmii-page__floral--tl" },
  { src: "/images/jmii/hero-flowers-top.png", className: "jmii-page__floral jmii-page__floral--tr" },
  { src: "/images/flower.png", className: "jmii-page__floral jmii-page__floral--bl" },
  { src: "/images/jmii/rsvp-floral.png", className: "jmii-page__floral jmii-page__floral--br" },
] as const;

export function PageFloralBackground() {
  return (
    <div className="jmii-page__floral-bg" aria-hidden>
      {FLORALS.map((floral) => (
        <div key={floral.className} className={floral.className}>
          <Image
            src={floral.src}
            alt=""
            width={220}
            height={220}
            className="jmii-page__floral-img"
          />
        </div>
      ))}
      <div className="jmii-page__floral-scrim" />
    </div>
  );
}
