import { WeddingExperience } from "@/components/jmii/WeddingExperience";
import weddingConfig from "@/config/wedding.config.json";
import { getGuestNameFromSearchParams } from "@/lib/guest-from-search-params";
import type { WeddingConfig } from "@/types/wedding.types";

type HomeProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const guestName = getGuestNameFromSearchParams(params);

  return <WeddingExperience config={weddingConfig as WeddingConfig} guestName={guestName} />;
}
