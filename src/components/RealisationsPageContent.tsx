"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SelectedWorks } from "@/components/SelectedWorks";
import { useTranslations } from "@/hooks/useTranslations";

export function RealisationsPageContent() {
  const pathname = usePathname();
  const { t } = useTranslations();
  const rp = t.realisationsPage;
  const prefix =
    pathname.startsWith("/en-gb") ? "/en-gb" : pathname.startsWith("/en-us") ? "/en-us" : "";

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 md:px-16">
        <Link
          href={`${prefix || "/"}`}
          className="mb-10 inline-flex items-center gap-2 text-sm font-light tracking-[0.1em] text-zinc-400 transition-colors hover:text-zinc-100"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          {rp.backHome}
        </Link>

        <header className="mb-10 text-center sm:mb-14">
          <h1 className="font-tech mb-4 text-3xl font-semibold uppercase tracking-[0.14em] text-zinc-100 sm:text-4xl md:text-5xl">
            {rp.pageTitle}
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-[1.85] tracking-[0.02em] text-zinc-400 sm:text-base">
            {rp.intro}
          </p>
        </header>
      </div>

      <SelectedWorks sectionId="realisations" showSectionHeading={false} />
    </>
  );
}
