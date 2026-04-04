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
  description: string,
  /** URL absolue de l’image (carte Twitter / réseaux). Par défaut : OG PhantomDev. */
  twitterImageAbsoluteUrl?: string
): NonNullable<Metadata["twitter"]> {
  const image =
    twitterImageAbsoluteUrl ?? `${SITE_URL}${OG_IMAGE_PATH}`;
  return {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  };
}

export const GRAPHENE_OG_LOGO_PATH = "/graphene/grapheneos-logo.png";

/** Base URL + dimensions ; préciser `alt` dans les métadonnées par langue. */
export const grapheneOpenGraphImageBase = {
  url: GRAPHENE_OG_LOGO_PATH,
  width: 512,
  height: 512,
} as const;
