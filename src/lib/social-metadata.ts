import type { Metadata } from "next";

export const SITE_URL = "https://phantomdev.fr";

const OG_IMAGE_PATH = "/og-image.png";

export const defaultOpenGraphImage = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: "PhantomDev — Sites web premium sur-mesure, performances Lighthouse 90+",
} as const;

export const defaultOpenGraphImages: NonNullable<Metadata["openGraph"]>["images"] = [
  defaultOpenGraphImage,
];

export function twitterSummaryLarge(
  title: string,
  description: string
): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL}${OG_IMAGE_PATH}`],
  };
}
