import type { WeddingConfig } from "@/types/wedding.types";

export function getAuthorLabel(config: WeddingConfig): string {
  return config.author?.label?.trim() || config.footer.brandLabel?.trim() || "";
}
