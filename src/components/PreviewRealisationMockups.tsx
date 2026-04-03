"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

/** Capture distante (aperçu). Remplace par /images/mockups/[id].jpg quand tu as tes fichiers. */
function remotePreviewUrl(siteUrl: string) {
  return `https://image.thum.io/get/width/1200/crop/675/noanimate/${encodeURIComponent(siteUrl)}`;
}

export function PreviewRealisationMockups() {
  return (
    <div className="min-h-screen bg-[#050505] px-4 py-12 text-[#f5f5f0] sm:px-8 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-xs font-light tracking-[0.2em] text-[#d4af37]/90">
          PRÉVISUALISATION — NON PUBLIÉE
        </p>
        <h1
          className="mb-3 text-2xl font-extralight tracking-[0.12em] sm:text-3xl"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Réalisations : logo + mockup site
        </h1>
        <p className="mb-2 max-w-2xl text-sm leading-relaxed text-[#f5f5f0]/65">
          Cette page n&apos;est pas dans le menu et n&apos;est pas indexée. Valide le rendu ici ; quand tu es
          satisfait, on intègre le même bloc dans la section Réalisations du site public.
        </p>
        <p className="mb-10 text-xs text-[#f5f5f0]/45">
          Les captures proviennent d&apos;un service tiers (aperçu). Pour la prod, place tes propres images dans{" "}
          <code className="rounded bg-[#f5f5f0]/10 px-1">public/images/mockups/</code> (ex.{" "}
          <code className="rounded bg-[#f5f5f0]/10 px-1">phantom-art.jpg</code>).
        </p>

        <ul className="flex flex-col gap-16 md:gap-20">
          {projects.map((project) => (
            <li key={project.id}>
              <PreviewCard project={project} />
            </li>
          ))}
        </ul>

        <p className="mt-16 border-t border-[#f5f5f0]/10 pt-8 text-center text-sm text-[#f5f5f0]/50">
          <Link href="/" className="text-[#d4af37]/80 underline-offset-4 hover:underline">
            Retour à l&apos;accueil
          </Link>
        </p>
      </div>
    </div>
  );
}

function PreviewCard({ project }: { project: (typeof projects)[number] }) {
  const [imgOk, setImgOk] = useState(true);
  const thumb = remotePreviewUrl(project.href);

  return (
    <article className="grid gap-8 rounded-sm border border-[#f5f5f0]/10 bg-[#0a0a0a]/50 p-6 md:grid-cols-[minmax(0,200px)_1fr] md:items-start md:gap-10 md:p-8">
      {/* Logo */}
      <div className="flex flex-col items-center gap-3 md:items-start">
        <p className="text-[10px] font-light uppercase tracking-[0.2em] text-[#f5f5f0]/40">Logo</p>
        <div
          className={`relative flex h-28 w-full max-w-[180px] items-center justify-center overflow-hidden rounded-sm border border-[#f5f5f0]/15 px-4 py-6 ${
            project.id === "kraken-metals"
              ? "bg-[#003548]"
              : project.id === "redk-motors"
                ? "bg-[#1a1a1a]"
                : project.imageBg === "white"
                  ? "bg-white"
                  : "bg-[#2A2A2A]"
          }`}
        >
          {project.id !== "kraken-metals" && project.id !== "redk-motors" && (
            <Image
              src={project.image}
              alt=""
              width={160}
              height={100}
              className="max-h-20 w-auto object-contain"
            />
          )}
          {project.id === "kraken-metals" && (
            <span className="text-center text-sm font-bold uppercase tracking-[0.2em] text-white/90">
              KRAKEN
              <br />
              METALS
            </span>
          )}
          {project.id === "redk-motors" && (
            <span className="text-center text-sm font-bold uppercase tracking-wide text-[#d41e24] drop-shadow-[0_0_8px_rgba(212,30,36,0.8)]">
              RED-K <span className="text-white">MOTORS</span>
            </span>
          )}
        </div>
        <h2
          className="text-center text-lg font-extralight tracking-[0.1em] md:text-left"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          {project.title}
        </h2>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#d4af37]/80 underline-offset-2 hover:underline"
        >
          Ouvrir le site →
        </a>
      </div>

      {/* Mockup navigateur */}
      <div>
        <p className="mb-3 text-[10px] font-light uppercase tracking-[0.2em] text-[#f5f5f0]/40">
          Mockup (aperçu du site)
        </p>
        <div className="overflow-hidden rounded-md border border-[#2a2a2a] bg-[#121212] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
          <div className="flex items-center gap-2 border-b border-[#2a2a2a] bg-[#1c1c1c] px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 flex-1 truncate rounded bg-[#0a0a0a] px-2 py-1 text-[10px] text-[#f5f5f0]/35">
              {project.href.replace(/^https?:\/\//, "")}
            </span>
          </div>
          <div className="relative aspect-[16/10] w-full bg-[#0a0a0a]">
            {imgOk ? (
              // eslint-disable-next-line @next/next/no-img-element -- URL externe dynamique, pas d'optimisation Next
              <img
                src={thumb}
                alt={`Aperçu ${project.title}`}
                className="h-full w-full object-cover object-top"
                loading="lazy"
                onError={() => setImgOk(false)}
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
                <p className="text-sm text-[#f5f5f0]/50">Capture indisponible pour ce projet.</p>
                <p className="text-xs text-[#f5f5f0]/35">
                  Ajoute <code className="rounded bg-[#f5f5f0]/10 px-1">public/images/mockups/{project.id}.jpg</code>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
