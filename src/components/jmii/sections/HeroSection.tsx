import Image from "next/image";
import { HeroEnvelopeFrame } from "@/components/jmii/sections/HeroEnvelopeFrame";
import { resolveHeroCardPhotos } from "@/lib/hero-card-photos";
import type { HeroConfig, ThemeAssets, WeddingCouple } from "@/types/wedding.types";

interface HeroSectionProps {
  hero: HeroConfig;
  theme: ThemeAssets;
  couple: WeddingCouple;
  invitationLabel: string;
  guestName?: string;
  bannerPhoto?: string;
}

export function HeroSection({
  hero,
  theme,
  couple,
  invitationLabel,
  guestName,
  bannerPhoto,
}: HeroSectionProps) {
  const banner = bannerPhoto ?? hero.heroPhoto;
  const cardPhotos = resolveHeroCardPhotos(hero);

  return (
    <section className="jmii-hero">
      <div className="jmii-hero__topbar" aria-hidden />
{/* 
      <div className="jmii-hero__frame">
        <h1 className="jmii-hero__save">{hero.saveTheDate}</h1>

        <div className="jmii-hero__collage">
          <HeroEnvelopeFrame
            cardPhotos={cardPhotos}
            groom={couple.groom}
            bride={couple.bride}
            weddingDate={couple.weddingDate}
            invitationLabel={invitationLabel}
            guestName={guestName}
            waxSealSrc={theme.heroWaxSeal}
          />

          {theme.heroFlowersTop ? (
            <div className="jmii-hero__flowers jmii-hero__flowers--right" aria-hidden>
              <Image
                src={theme.heroFlowersTop}
                alt=""
                width={100}
                height={160}
                className="jmii-hero__flowers-img"
                priority
              />
            </div>
          ) : null}

          {theme.heroFlowersBottom ? (
            <div className="jmii-hero__flowers jmii-hero__flowers--left" aria-hidden>
              <Image
                src={theme.heroFlowersBottom}
                alt=""
                width={170}
                height={200}
                className="jmii-hero__flowers-img"
                priority
              />
            </div>
          ) : null}

        </div>
      </div> */}

      <div className="jmii-hero__photo-full">
        <div className="jmii-hero__photo-bg">
          <Image src={banner} alt="" fill className="object-cover object-bottom" sizes="100vw" priority />
        </div>
        
        {hero.bannerOverlayTitle && (
          <div className="jmii-hero__banner-overlay">
            <h2 className="jmii-hero__banner-title">
              {hero.bannerOverlayTitle.split(' ').map((word, idx) => (
                <span key={idx} className="jmii-hero__banner-title-word">
                  {word}
                </span>
              ))}
            </h2>
            {hero.bannerOverlayDate && (
              <p className="jmii-hero__banner-date">
                <span className="jmii-hero__banner-heart">♥</span>
                {hero.bannerOverlayDate}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
