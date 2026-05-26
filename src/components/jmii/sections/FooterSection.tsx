import Image from "next/image";
import type { WeddingConfig } from "@/types/wedding.types";

interface FooterSectionProps {
  footer: WeddingConfig["footer"];
  backgroundImage?: string;
}

export function FooterSection({ footer, backgroundImage }: FooterSectionProps) {
  return (
    <footer className="jmii-footer reveal-on-scroll">
      <div
        className="jmii-footer__hero"
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
      >
        <div className="jmii-footer__hero-overlay" />
        <p className="jmii-footer__script jmii-script">{footer.thankYouScript}</p>
        <p className="jmii-footer__message">{footer.thankYouMessage}</p>
      </div>

      <div className="jmii-footer__bar">
        {footer.social?.length ? (
          <div className="jmii-footer__social">
            {footer.social.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
                className="jmii-footer__social-link"
              >
                <Image src={link.icon} alt="" width={28} height={28} className="object-contain" />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
