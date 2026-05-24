/** Query keys for personalized cover, e.g. `/?guest=Nguyễn Văn A` */
const GUEST_PARAM_KEYS = ["guest", "to", "ten"] as const;

type GuestSearchParams = Partial<Record<(typeof GUEST_PARAM_KEYS)[number], string | string[]>>;

function normalizeParam(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw?.trim()) return undefined;
  try {
    return decodeURIComponent(raw.trim());
  } catch {
    return raw.trim();
  }
}

export function getGuestNameFromSearchParams(
  searchParams: GuestSearchParams | undefined
): string | undefined {
  if (!searchParams) return undefined;

  for (const key of GUEST_PARAM_KEYS) {
    const name = normalizeParam(searchParams[key]);
    if (name) return name;
  }

  return undefined;
}
