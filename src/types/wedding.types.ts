export interface WeddingCouple {
  groom: string;
  bride: string;
  weddingDate: string;
  hashtag?: string;
}

export interface FamilySide {
  label: string;
  fatherTitle: string;
  father: string;
  motherTitle: string;
  mother: string;
}

export interface ThemeAssets {
  heroFlowersTop?: string;
  heroFlowersBottom?: string;
  heroEnvelope?: string;
  heroWaxSeal?: string;
  flowerImage?: string;
  parentsFloral?: string;
  calendarBg?: string;
  timelineFlower?: string;
  timelineChampagne?: string;
  dresscodeMonet?: string;
  footerThankYouBg?: string;
  rsvpFloral?: string;
}

export interface CoverCopy {
  invitationLabel: string;
  openButtonText: string;
  floral?: string;
  backgroundImage?: string;
}

export interface TypographyConfig {
  baseFontSize: number;
}

export interface HeroConfig {
  saveTheDate: string;
  polaroidDate: string;
  heroPhoto: string;
  /** Ảnh polaroid phía sau (tuỳ chọn) */
  heroPhotoSecondary?: string;
  /** Ảnh hiển thị bên trong thiệp (phong bì). Mặc định: heroPhoto + heroPhotoSecondary */
  cardPhotos?: string[];
}

export interface EventConfig {
  invitationLine: string;
  venueName: string;
  address: string;
  mapsUrl: string;
  mapsLabel: string;
  hostedAtLabel: string;
  timeLine: string;
  day: string;
  month: string;
  year: string;
  lunarDate: string;
}

export interface LoveStoryConfig {
  quoteOnPhoto?: string;
  sectionTitle?: string;
  paragraphs: string[];
}

export interface CouplePhotoConfig {
  groomImage: string;
  brideImage: string;
  groomRoleLabel: string;
  brideRoleLabel: string;
}

export interface TimelineItem {
  time: string;
  label: string;
  icon?: string;
}

export interface DresscodeConfig {
  title: string;
  subtitle: string;
  colorLeft?: string;
  colorRight?: string;
  monetImage?: string;
}

export interface CalendarConfig {
  monthLabel: string;
  highlightDay: number;
  scatteredRows?: (number | string)[][];
}

export interface GalleryConfig {
  images: string[];
}

export interface RsvpOption {
  value: string;
  label: string;
}

export interface RsvpConfig {
  title: string;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  namePlaceholder: string;
  messagePlaceholder: string;
  attendanceLabel: string;
  attendanceOptions: RsvpOption[];
  guestSideLabel: string;
  guestSideOptions: RsvpOption[];
  guestCountPlaceholder: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface GiftConfig {
  title: string;
  accountName: string;
  bankName: string;
  accountNumber: string;
}

export interface WeddingConfig {
  meta: {
    title: string;
    description: string;
  };
  theme: ThemeAssets;
  cover: CoverCopy;
  typography?: TypographyConfig;
  music?: {
    src: string;
    enabled: boolean;
  };
  couple: WeddingCouple;
  hero: HeroConfig;
  heroBannerPhoto?: string;
  quoteBannerPhoto?: string;
  families: {
    groom: FamilySide;
    bride: FamilySide;
  };
  event: EventConfig;
  loveStory: LoveStoryConfig;
  couplePhotos: CouplePhotoConfig;
  calendar: CalendarConfig;
  timeline: TimelineItem[];
  dresscode: DresscodeConfig;
  countdown: {
    label: string;
  };
  gallery?: GalleryConfig;
  rsvp: RsvpConfig;
  gift?: GiftConfig;
  footer: {
    thankYouScript: string;
    thankYouMessage: string;
    brandLabel: string;
    social?: SocialLink[];
  };
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
