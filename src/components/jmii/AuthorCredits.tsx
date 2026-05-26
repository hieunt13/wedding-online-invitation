interface AuthorCreditsProps {
  label: string;
  zone: "cover" | "outer" | "inside";
}

export function AuthorCredits({ label, zone }: AuthorCreditsProps) {
  if (!label) return null;

  return (
    <p className={`jmii-author jmii-author--${zone}`} aria-label={label}>
      {label}
    </p>
  );
}
