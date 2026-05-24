import Image from "next/image";
import type { CouplePhotoConfig } from "@/types/wedding.types";

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
  return (
    <section className="jmii-section jmii-couple-photos reveal-on-scroll">
      <div className="jmii-couple-photos__stack">
        <article className="jmii-couple-photos__card jmii-couple-photos__card--groom">
          <div className="jmii-polaroid jmii-polaroid--tilt-left">
            <div className="jmii-polaroid__photo">
              <Image
                src={couplePhotos.groomImage}
                alt={groomName}
                fill
                className="object-cover object-top"
                sizes="70vw"
              />
            </div>
          </div>
          <p className="jmii-couple-photos__role">{couplePhotos.groomRoleLabel}</p>
          <p className="jmii-couple-photos__name">{groomName}</p>
        </article>

        <article className="jmii-couple-photos__card jmii-couple-photos__card--bride">
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
          <p className="jmii-couple-photos__role">{couplePhotos.brideRoleLabel}</p>
          <p className="jmii-couple-photos__name">{brideName}</p>
        </article>
      </div>
    </section>
  );
}
