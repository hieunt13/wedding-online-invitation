import type { RsvpOption } from "@/types/wedding.types";

/** Định dạng `dd/mm/yyyy HH:mm` (giờ Việt Nam). */
export function formatRsvpTimestamp(date = new Date()): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Ho_Chi_Minh",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
      .formatToParts(date)
      .map((part) => [part.type, part.value]),
  );

  return `${parts.day}/${parts.month}/${parts.year} ${parts.hour}:${parts.minute}`;
}

export interface RsvpSubmissionPayload {
  name: string;
  message: string;
  attendance: string;
  attendanceLabel: string;
  guestSide: string;
  guestSideLabel: string;
  guestCount: string;
}

export function resolveOptionLabel(
  options: RsvpOption[],
  value: string,
): string {
  return options.find((opt) => opt.value === value)?.label ?? value;
}

export function buildRsvpPayload(
  data: {
    name: string;
    message: string;
    attendance: string;
    guestSide: string;
    guestCount: string;
  },
  options: {
    attendanceOptions: RsvpOption[];
    guestSideOptions: RsvpOption[];
  },
): RsvpSubmissionPayload {
  return {
    name: data.name.trim(),
    message: data.message.trim(),
    attendance: data.attendance,
    attendanceLabel: resolveOptionLabel(options.attendanceOptions, data.attendance),
    guestSide: data.guestSide,
    guestSideLabel: resolveOptionLabel(options.guestSideOptions, data.guestSide),
    guestCount: data.guestCount.trim(),
  };
}
