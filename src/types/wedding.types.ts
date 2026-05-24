export interface WeddingCouple {
  bride: string;
  groom: string;
  weddingDate: string;
  hashtag?: string;
  groomTitle?: string;
  brideTitle?: string;
  relationshipLine?: string;
}

export interface FamilySide {
  label: string;
  father: string;
  mother: string;
  address: string;
}

export interface ThemeAssets {
  flowerImage: string;
  leavesImage: string;
}

/** Adjust `baseFontSize` (px) to scale all invitation text. Default reference: 16px. */
export interface TypographyConfig {
  baseFontSize: number;
}

export interface CoverCopy {
  invitationLabel: string;
  openButtonText: string;
}

export interface AnnouncementCopy {
  heading: string;
  subheading: string;
}

export interface ScheduleBlock {
  locationLabel: string;
  location: string;
  timeLabel: string;
  time: string;
  dayOfWeek: string;
  day: string;
  month: string;
  year: string;
  lunarDate?: string;
  locationLine?: string;
  timeDetail?: string;
  dateDisplay?: string;
}

export interface ReceptionBlock {
  title: string;
  subtitle: string;
  time: string;
  dayOfWeek: string;
  day: string;
  month: string;
  year: string;
  lunarDate?: string;
  guestArrivalLabel: string;
  guestArrivalTime: string;
  partyStartLabel: string;
  partyStartTime: string;
  calendarMonthLabel: string;
  venueType?: string;
  venueName?: string;
  venueHall?: string;
  address?: string;
  timeDetail?: string;
  dateDisplay?: string;
  closingLine1?: string;
  closingLine2?: string;
  scheduleNote?: string;
}

export interface GalleryImage {
  url: string;
  alt: string;
  className?: string;
}

export interface CouplePortraits {
  groom: string;
  bride: string;
}

export interface StoryEvent {
  season: string;
  title: string;
  description: string;
}

export interface CelebrationEvent {
  type: string;
  title: string;
  time: string;
  location: string;
  icon: string;
  mapAction: string;
}

export interface RSVPField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  rows?: number;
}

export interface WeddingConfig {
  theme: ThemeAssets;
  typography?: TypographyConfig;
  cover: CoverCopy;
  couple: WeddingCouple;
  families: {
    groom: FamilySide;
    bride: FamilySide;
  };
  announcement: AnnouncementCopy;
  ceremony: ScheduleBlock;
  reception: ReceptionBlock;
  images: {
    hero: string;
    gallery: GalleryImage[];
    galleryMoreCount?: number;
    couplePortraits?: CouplePortraits;
  };
  story?: StoryEvent[];
  events?: CelebrationEvent[];
  rsvp: {
    deadline: string;
    fields: RSVPField[];
  };
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
}

export interface RSVPFormData {
  fullName: string;
  phone: string;
  wishes?: string;
}
