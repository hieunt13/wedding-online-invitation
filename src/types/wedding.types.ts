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
  /** Dòng chỉ dẫn dưới phong bì (vd. Chạm vào thiệp để mở) */
  tapHint?: string;
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
  /** Text overlay trên banner photo */
  bannerOverlayTitle?: string;
  /** Ngày overlay trên banner photo */
  bannerOverlayDate?: string;
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
  /** Trang trí khoảng trống cạnh ảnh chú rể (hoa) */
  groomAccentImage?: string;
  /** Trang trí khoảng trống cạnh ảnh cô dâu (tem / wax seal) */
  brideAccentImage?: string;
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
  images: (
    | string
    | {
        src: string;
        caption?: string;
        /** Number of columns to span in the mosaic grid */
        colSpan?: number;
        /** Number of rows to span in the mosaic grid */
        rowSpan?: number;
      }
  )[];
}

export interface PreWeddingQuoteItem {
  /** Một ảnh — dùng với `banner`, `caption` hoặc `split`. */
  photo?: string;
  /** Hai ảnh — dùng với `stack`, `duo` hoặc `stagger`. */
  photos?: [string, string];
  quote: string;
  /** `banner` | `caption` | `split` | `stack` | `duo` | `stagger` */
  layout?: "banner" | "caption" | "split" | "stack" | "duo" | "stagger";
  /** Đảo vị trí ảnh/chữ (chỉ `split`). Mặc định xen kẽ theo thứ tự. */
  reverse?: boolean;
}

export interface PreWeddingQuotesConfig {
  items: PreWeddingQuoteItem[];
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
  preWeddingQuotes?: PreWeddingQuotesConfig;
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
