import Image from "next/image";

interface HeroEnvelopeFrameProps {
  cardPhotos: string[];
  groom: string;
  bride: string;
  weddingDate: string;
  invitationLabel: string;
  guestName?: string;
  waxSealSrc?: string;
}

function formatHeroDate(dateString: string) {
  const d = new Date(dateString);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}.${d.getFullYear()}`;
}

export function HeroEnvelopeFrame({
  cardPhotos,
  groom,
  bride,
  weddingDate,
  invitationLabel,
  guestName,
  waxSealSrc,
}: HeroEnvelopeFrameProps) {
  const peekPhotos = cardPhotos.slice(0, 2);
  const inviteLine = guestName
    ? `Trân trọng mời ${guestName}`
    : "Trân trọng mời Bạn";

  return (
    <div className="jmii-hero__envelope" aria-hidden>
      <div className="jmii-hero__envelope-scene">
        <div className="jmii-hero__envelope-back" />
        <div className="jmii-hero__envelope-flap" />

        {peekPhotos.length > 0 ? (
          <div className="jmii-hero__envelope-polaroids">
            {peekPhotos.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className={`jmii-hero__envelope-polaroid jmii-hero__envelope-polaroid--${index === 0 ? "lead" : "back"}`}
              >
                <div
                  className="jmii-hero__envelope-polaroid-shake"
                  style={{ animationDelay: `${index * -0.45}s` }}
                >
                  <div className="jmii-hero__envelope-polaroid-media">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="130px"
                      className="jmii-hero__envelope-polaroid-img"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <div className="jmii-hero__envelope-card">
          <div className="jmii-hero__envelope-card-copy">
            <p className="jmii-hero__envelope-card-label">{invitationLabel}</p>
            <p className="jmii-hero__envelope-card-names jmii-script">
              {groom} &amp; <br /> {bride}
            </p>
            <p className="jmii-hero__envelope-card-date">
              {formatHeroDate(weddingDate)}
            </p>
            <p className="jmii-hero__envelope-card-invite jmii-script">
              {inviteLine}
            </p>
          </div>
        </div>

        <div className="jmii-hero__envelope-front" />

        <div className="jmii-hero__envelope-seal">
          {waxSealSrc ? (
            <Image
              src={waxSealSrc}
              alt=""
              width={48}
              height={48}
              className="jmii-hero__envelope-seal-img"
              priority
            />
          ) : (
            <span className="jmii-hero__envelope-seal-fallback" aria-hidden />
          )}
        </div>
      </div>
    </div>
  );
}
