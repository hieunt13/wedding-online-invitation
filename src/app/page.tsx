import { WeddingExperience } from "@/components/jmii/WeddingExperience";
import weddingConfig from "@/config/wedding.config.json";
import { getGuestNameFromSearchParams } from "@/lib/guest-from-search-params";
import { getWishes } from "@/lib/get-wishes";
import type { WeddingConfig } from "@/types/wedding.types";

export const revalidate = 60;

type HomeProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const guestName = getGuestNameFromSearchParams(params);
  const config = weddingConfig as WeddingConfig;

  const wishes = config.wishes?.enabled ? await getWishes() : [];

  return <WeddingExperience config={config} guestName={guestName} wishes={wishes} />;
}
