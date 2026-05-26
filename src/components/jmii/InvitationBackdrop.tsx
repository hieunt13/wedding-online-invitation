import Image from "next/image";

interface InvitationBackdropProps {
  src: string;
}

export function InvitationBackdrop({ src }: InvitationBackdropProps) {
  return (
    <div className="jmii-invitation-bg" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className="jmii-invitation-bg__img"
        priority
      />
      <div className="jmii-invitation-bg__overlay" />
    </div>
  );
}
