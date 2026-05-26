"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import type { WishItem } from "@/lib/wishes";
import type { WishesConfig } from "@/types/wedding.types";

const WISH_CARD_FLORAL = "/images/flower.png";

interface WishesMarqueeSectionProps {
  config: WishesConfig;
  wishes: WishItem[];
}

function formatWishQuote(message: string) {
  const trimmed = message.trim();
  if (!trimmed) return '""';
  const hasQuotes =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("\u201c") && trimmed.endsWith("\u201d"));
  return hasQuotes ? trimmed : `\u201c${trimmed}\u201d`;
}

function WishItemCard({ wish }: { wish: WishItem }) {
  return (
    <article className="jmii-wishes__card">
      <Image
        src={WISH_CARD_FLORAL}
        alt=""
        width={56}
        height={56}
        className="jmii-wishes__floral"
        aria-hidden
      />
      <header className="jmii-wishes__card-head">
        <p className="jmii-wishes__name">{wish.name}</p>
      </header>
      <p className="jmii-wishes__message">{formatWishQuote(wish.message)}</p>
    </article>
  );
}

export function WishesMarqueeSection({ config, wishes }: WishesMarqueeSectionProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const emptyHide = config.emptyHide !== false;
  if (wishes.length === 0 && emptyHide) return null;

  return (
    <section
      className="jmii-section jmii-wishes reveal-on-scroll revealed"
      aria-label={config.title ?? "Lời chúc"}
    >
      {config.title ? <h3 className="jmii-wishes__title jmii-script">{config.title}</h3> : null}

      <div className="jmii-wishes__marquee">
        {reduceMotion ? (
          <div className="jmii-wishes__static">
            {wishes.map((wish, index) => (
              <WishItemCard key={`${wish.name}-${index}`} wish={wish} />
            ))}
          </div>
        ) : (
          <Marquee
            pauseOnHover
            speed={40}
            autoFill
            gradient
            gradientColor="#ffffff"
            gradientWidth={48}
            className="jmii-wishes__marquee-content"
          >
            {wishes.map((wish, index) => (
              <WishItemCard key={`${wish.name}-${index}`} wish={wish} />
            ))}
          </Marquee>
        )}
      </div>

      <ul className="jmii-wishes__sr-list sr-only">
        {wishes.map((wish, index) => (
          <li key={`sr-${wish.name}-${index}`}>
            {wish.name}: {wish.message}
          </li>
        ))}
      </ul>
    </section>
  );
}
