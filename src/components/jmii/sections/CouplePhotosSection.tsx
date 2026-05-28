import Image from "next/image";
import type { CouplePhotoConfig } from "@/types/wedding.types";

const DEFAULT_GROOM_ACCENT = "/images/jmii/parents-floral.png";
const DEFAULT_BRIDE_ACCENT = "/images/jmii/hero-wax-seal.png";

interface CouplePhotosSectionProps {
  couplePhotos: CouplePhotoConfig;
  groomName: string;
  brideName: string;
}

export function CouplePhotosSection({
  couplePhotos,
  groomName,
  brideName,
}: CouplePhotosSectionProps) {
  const groomAccent = couplePhotos.groomAccentImage ?? DEFAULT_GROOM_ACCENT;
  const brideAccent = couplePhotos.brideAccentImage ?? DEFAULT_BRIDE_ACCENT;

  return (
    <section className="jmii-section jmii-couple-photos reveal-on-scroll">
      <div className="jmii-couple-photos__stack">
        <article className="jmii-couple-photos__card jmii-couple-photos__card--groom couple-card-left">
          <div className="jmii-couple-photos__row">
            <div className="jmii-polaroid jmii-polaroid--tilt-left">
              <div className="jmii-polaroid__photo">
                <Image
                  src={couplePhotos.groomImage}
                  alt={groomName}
                  fill
                  className="object-cover object-bottom"
                  sizes="70vw"
                />
              </div>
            </div>
            <div className="jmii-couple-photos__accent jmii-couple-photos__accent--groom" aria-hidden>
              <Image
                src={groomAccent}
                alt=""
                width={120}
                height={120}
                className="jmii-couple-photos__accent-img jmii-couple-photos__accent-img--floral"
              />
            </div>
          </div>
          <p className="jmii-couple-photos__role">{couplePhotos.groomRoleLabel}</p>
          <p className="jmii-couple-photos__name">{groomName}</p>
        </article>

        <article className="jmii-couple-photos__card jmii-couple-photos__card--bride couple-card-right">
          <div className="jmii-couple-photos__row jmii-couple-photos__row--bride">
            <div className="jmii-couple-photos__accent jmii-couple-photos__accent--bride" aria-hidden>
              <Image
                src={brideAccent}
                alt=""
                width={72}
                height={72}
                className="jmii-couple-photos__accent-img jmii-couple-photos__accent-img--stamp"
              />
            </div>
            <div className="jmii-polaroid jmii-polaroid--tilt-right">
              <div className="jmii-polaroid__photo">
                <Image
                  src={couplePhotos.brideImage}
                  alt={brideName}
                  fill
                  className="object-cover object-top"
                  sizes="70vw"
                />
              </div>
            </div>
          </div>
          <p className="jmii-couple-photos__role">{couplePhotos.brideRoleLabel}</p>
          <p className="jmii-couple-photos__name">{brideName}</p>
        </article>
      </div>
    </section>
  );
}
