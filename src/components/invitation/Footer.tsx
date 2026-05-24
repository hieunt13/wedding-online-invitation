import { FloralCorner } from "@/components/shared/FloralCorner";

interface FooterProps {
  bride: string;
  groom: string;
  date: string;
  flowerImage: string;
}

function formatDate(dateString: string) {
  const d = new Date(dateString);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${d.getDate()} . ${month} . ${d.getFullYear()}`;
}

export function Footer({ bride, groom, date, flowerImage }: FooterProps) {
  return (
    <footer className="hm-section reveal-on-scroll reveal-delay-8 relative px-6 py-16 text-center overflow-hidden">
      <FloralCorner flowerImage={flowerImage} position="bottom-left" className="opacity-60" />
      <FloralCorner flowerImage={flowerImage} position="bottom-right" className="opacity-60" />

      <div className="relative z-10">
        <span className="text-hm-green/70 text-xl" aria-hidden>
          ❦
        </span>
        <p className="hm-display-couple text-hm-green mt-4 mb-2">{groom} &amp; {bride}</p>
        <p className="hm-label text-hm-green">{formatDate(date)}</p>
        <p className="hm-body-sm text-hm-green/70 mt-8 tracking-wide">
          With love · Forever begins here
        </p>
      </div>
    </footer>
  );
}
