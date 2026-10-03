import { WeddingExperience } from "@/components/jmii/WeddingExperience";
import weddingConfig from "@/config/wedding.config.json";
import { getAnnouncementConfig } from "@/lib/announcement-config";
import { getGuestNameFromSearchParams } from "@/lib/guest-from-search-params";
import { getWishes } from "@/lib/get-wishes";
import { buildWeddingMetadata } from "@/lib/wedding-metadata";
import type { WeddingConfig } from "@/types/wedding.types";
import type { Metadata } from "next";

export const revalidate = 60;

const baseConfig = weddingConfig as WeddingConfig;
const announcementConfig = getAnnouncementConfig(baseConfig);

export const metadata: Metadata = buildWeddingMetadata(announcementConfig, {
  path: "/announcement",
});

type AnnouncementPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AnnouncementPage({ searchParams }: AnnouncementPageProps) {
  const params = await searchParams;
  const guestName = getGuestNameFromSearchParams(params);
  const wishes = announcementConfig.wishes?.enabled ? await getWishes() : [];

  return (
    <WeddingExperience
      config={announcementConfig}
      guestName={guestName}
      wishes={wishes}
      variant="announcement"
    />
  );
}
