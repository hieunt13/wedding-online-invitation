import Image from "next/image";

interface CoupleSidePortraitsProps {
  groomImage: string;
  brideImage: string;
  groomName: string;
  brideName: string;
}

export function CoupleSidePortraits({
  groomImage,
  brideImage,
  groomName,
  brideName,
}: CoupleSidePortraitsProps) {
  return (
    <>
      <div className="hm-couple-portrait hm-couple-portrait--groom relative" aria-hidden>
        <Image
          src={groomImage}
          alt={groomName}
          fill
          priority
          sizes="(min-width: 1024px) 28vw, 0px"
          className="object-contain object-bottom"
        />
      </div>
      <div className="hm-couple-portrait hm-couple-portrait--bride relative" aria-hidden>
        <Image
          src={brideImage}
          alt={brideName}
          fill
          priority
          sizes="(min-width: 1024px) 28vw, 0px"
          className="object-contain object-bottom"
        />
      </div>
    </>
  );
}
