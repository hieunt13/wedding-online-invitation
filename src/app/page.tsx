import { WeddingInvitation } from "@/components/invitation/WeddingInvitation";
import weddingConfig from "@/config/wedding.config.json";
import { getGuestNameFromSearchParams } from "@/lib/guest-from-search-params";

type HomeProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const guestName = getGuestNameFromSearchParams(params);

  return <WeddingInvitation config={weddingConfig} guestName={guestName} />;
}
