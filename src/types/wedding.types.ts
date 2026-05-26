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
  /** Ảnh nền mờ phía sau khung thiệp (mặc định: cover.backgroundImage) */
  invitationBackgroundImage?: string;
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
  title2: string;
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

export interface WishesConfig {
  enabled: boolean;
  title?: string;
  /** Ẩn section khi chưa có lời chúc (mặc định true) */
  emptyHide?: boolean;
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
    /** Ảnh preview khi chia sẻ link (đường dẫn trong public/, vd. /images/pre-wedding1.jpg) */
    ogImage?: string;
  };
  theme: ThemeAssets;
  cover: CoverCopy;
  typography?: TypographyConfig;
  music?: {
    /** YouTube / URL nguồn — dùng cho `npm run download-music` */
    src: string;
    /** File phát trên web (mặc định /audio/wedding-music.mp3) */
    file?: string;
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
  wishes?: WishesConfig;
  gift?: GiftConfig;
  author?: {
    label: string;
  };
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
