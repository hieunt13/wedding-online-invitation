"use client";

import { MusicToggle } from "@/components/jmii/MusicToggle";
import { PageFloralBackground } from "@/components/jmii/PageFloralBackground";
import { CalendarSection } from "@/components/jmii/sections/CalendarSection";
import { CountdownSection } from "@/components/jmii/sections/CountdownSection";
import { CouplePhotosSection } from "@/components/jmii/sections/CouplePhotosSection";
import { DresscodeSection } from "@/components/jmii/sections/DresscodeSection";
import { FooterSection } from "@/components/jmii/sections/FooterSection";
import { GallerySection } from "@/components/jmii/sections/GallerySection";
import { GiftSection } from "@/components/jmii/sections/GiftSection";
import { HeroSection } from "@/components/jmii/sections/HeroSection";
import { LoveStorySection } from "@/components/jmii/sections/LoveStorySection";
import { ParentsInviteSection } from "@/components/jmii/sections/ParentsInviteSection";
import { QuoteBannerSection } from "@/components/jmii/sections/QuoteBannerSection";
import { RsvpSection } from "@/components/jmii/sections/RsvpSection";
import { TimelineSection } from "@/components/jmii/sections/TimelineSection";
import { VenueDateSection } from "@/components/jmii/sections/VenueDateSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { baseFontSizeStyle } from "@/lib/typography";
import type { WeddingConfig } from "@/types/wedding.types";

interface JmiiInvitationProps {
  config: WeddingConfig;
  guestName?: string;
}

export function JmiiInvitation({ config, guestName }: JmiiInvitationProps) {
  useScrollReveal(true);

  const { couple, theme, music, hero, families, event, loveStory, couplePhotos } = config;
  const typographyStyle = baseFontSizeStyle(config.typography);

  return (
    <div className="jmii-page" style={typographyStyle}>
      <PageFloralBackground />
      <MusicToggle src={music?.src} enabled={music?.enabled} />

      <HeroSection hero={hero} theme={theme} bannerPhoto={config.heroBannerPhoto} />

      <ParentsInviteSection
        families={families}
        event={event}
        groomName={couple.groom}
        brideName={couple.bride}
        flowerImage={theme.parentsFloral}
      />

      <VenueDateSection event={event} />

      <QuoteBannerSection
        photo={config.quoteBannerPhoto ?? config.heroBannerPhoto ?? hero.heroPhoto}
        quote={loveStory.quoteOnPhoto}
      />

      <CouplePhotosSection
        couplePhotos={couplePhotos}
        groomName={couple.groom}
        brideName={couple.bride}
      />

      <LoveStorySection loveStory={loveStory} />

      <CalendarSection calendar={config.calendar} backgroundImage={theme.calendarBg} />

      <TimelineSection items={config.timeline} />

      <DresscodeSection dresscode={config.dresscode} />

      <CountdownSection weddingDate={couple.weddingDate} label={config.countdown.label} />

      {config.gallery ? <GallerySection gallery={config.gallery} /> : null}

      <RsvpSection rsvp={config.rsvp} defaultName={guestName} floralImage={theme.rsvpFloral} />

      {config.gift ? <GiftSection gift={config.gift} weddingDate={couple.weddingDate} /> : null}

      <FooterSection footer={config.footer} backgroundImage={theme.footerThankYouBg} />
    </div>
  );
}
