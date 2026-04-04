"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

const MOCKUP_EXTS = ["jpg", "png", "webp"] as const;

export function SiteMockupsPreview() {
  return (
    <div className="min-h-screen bg-[#050505] px-4 py-10 text-[#f5f5f0] sm:px-8 md:py-14">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 border-b border-[#f5f5f0]/10 pb-8">
          <h1
            className="text-2xl font-extralight tracking-[0.12em] sm:text-3xl"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Mockups des sites
          </h1>
          <p className="mt-3 max-w-xl text-sm text-[#f5f5f0]/55">
            Tu regardes, tu décides ensuite si on les met sur la page Réalisations du site public. Rien n&apos;y est
            lié pour l&apos;instant.
          </p>
          <p className="mt-3 max-w-xl text-xs text-[#f5f5f0]/40">
            Les aperçus viennent uniquement de tes fichiers dans{" "}
            <code className="rounded bg-[#f5f5f0]/10 px-1">public/images/mockups/</code> — pas de service externe
            (capture d&apos;écran à la main ou export Figma, etc.).
          </p>
          <p className="mt-4 text-xs text-[#f5f5f0]/35">
            URL : <code className="rounded bg-[#f5f5f0]/10 px-1.5 py-0.5">/mockups</code>
          </p>
        </header>

        <ul className="flex flex-col gap-14 md:gap-16">
          {projects.map((project) => (
            <li key={project.id}>
              <MockupBlock project={project} />
            </li>
          ))}
        </ul>

        <p className="mt-16 text-center text-sm text-[#f5f5f0]/45">
          <Link href="/" className="text-[#d4af37]/80 underline-offset-4 hover:underline">
            Retour accueil
          </Link>
        </p>
      </div>
    </div>
  );
}

function MockupBlock({ project }: { project: (typeof projects)[number] }) {
  const [extIndex, setExtIndex] = useState(0);

  const hasMore = extIndex < MOCKUP_EXTS.length;
  const src = hasMore ? `/images/mockups/${project.id}.${MOCKUP_EXTS[extIndex]}` : null;

  return (
    <article>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2
          className="text-xl font-extralight tracking-[0.1em] sm:text-2xl"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          {project.title}
        </h2>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#d4af37]/85 underline-offset-2 hover:underline"
        >
          Ouvrir le vrai site →
        </a>
      </div>

      <div className="overflow-hidden rounded-md border border-[#2a2a2a] bg-[#121212] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 border-b border-[#2a2a2a] bg-[#1c1c1c] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 flex-1 truncate rounded bg-[#0a0a0a] px-2 py-1 text-[10px] text-[#f5f5f0]/35">
            {project.href.replace(/^https?:\/\//, "")}
          </span>
        </div>
        <div className="relative aspect-[16/10] w-full bg-[#0a0a0a]">
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={`Mockup ${project.title}`}
              className="h-full w-full object-cover object-top"
              loading="lazy"
              onError={() => setExtIndex((i) => i + 1)}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="text-sm text-[#f5f5f0]/50">Pas encore de mockup pour ce projet.</p>
              <p className="text-xs text-[#f5f5f0]/35">
                Ajoute un fichier (essayés dans l&apos;ordre) :{" "}
                <code className="rounded bg-[#f5f5f0]/10 px-1">
                  public/images/mockups/{project.id}.jpg
                </code>
                , <code className="rounded bg-[#f5f5f0]/10 px-1">.png</code> ou{" "}
                <code className="rounded bg-[#f5f5f0]/10 px-1">.webp</code>
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
