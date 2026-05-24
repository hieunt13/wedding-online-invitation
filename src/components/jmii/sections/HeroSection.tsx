import Image from "next/image";
import type { HeroConfig, ThemeAssets } from "@/types/wedding.types";

interface HeroSectionProps {
  hero: HeroConfig;
  theme: ThemeAssets;
  bannerPhoto?: string;
}

export function HeroSection({ hero, theme, bannerPhoto }: HeroSectionProps) {
  const banner = bannerPhoto ?? hero.heroPhoto;
  const backPhoto = hero.heroPhotoSecondary ?? hero.heroPhoto;

  return (
    <section className="jmii-hero">
      <div className="jmii-hero__topbar" aria-hidden />

      <div className="jmii-hero__frame">
        <h1 className="jmii-hero__save jmii-script">{hero.saveTheDate}</h1>

        <div className="jmii-hero__collage">
          {theme.heroEnvelope ? (
            <div className="jmii-hero__envelope" aria-hidden>
              <Image
                src={theme.heroEnvelope}
                alt=""
                width={280}
                height={320}
                className="jmii-hero__envelope-img"
                priority
              />
            </div>
          ) : null}

          <div className="jmii-hero__polaroids">
            <div className="jmii-hero__polaroid jmii-hero__polaroid--back" aria-hidden>
              <div className="jmii-hero__polaroid-photo">
                <Image
                  src={backPhoto}
                  alt=""
                  width={120}
                  height={130}
                  className="jmii-hero__polaroid-img"
                  priority
                />
              </div>
            </div>

            <div className="jmii-hero__polaroid jmii-hero__polaroid--front">
              <div className="jmii-hero__polaroid-photo">
                <Image
                  src={hero.heroPhoto}
                  alt=""
                  width={132}
                  height={142}
                  className="jmii-hero__polaroid-img"
                  priority
                />
              </div>
              <p className="jmii-hero__polaroid-date">{hero.polaroidDate}</p>
            </div>
          </div>

          {theme.heroFlowersTop ? (
            <div className="jmii-hero__flowers jmii-hero__flowers--right" aria-hidden>
              <Image
                src={theme.heroFlowersTop}
                alt=""
                width={200}
                height={260}
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

          {theme.heroWaxSeal ? (
            <div className="jmii-hero__seal" aria-hidden>
              <Image
                src={theme.heroWaxSeal}
                alt=""
                width={52}
                height={52}
                className="jmii-hero__seal-img"
                priority
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className="jmii-hero__photo-full">
        <Image src={banner} alt="" fill className="object-cover object-top" sizes="100vw" priority />
      </div>
    </section>
  );
}
