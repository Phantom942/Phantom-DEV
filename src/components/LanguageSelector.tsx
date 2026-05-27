"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/i18n";
import { locales, localeFlags, localeNames, localePaths, getLocaleFromPath } from "@/i18n";

function useLocalizedPath() {
  const pathname = usePathname();
  const getLocalizedPath = (locale: Locale) => {
    const base = localePaths[locale];
    const frPath = pathname.replace(/^\/en-(gb|us)/, "") || "/";
    const enPath = pathname === "/" ? base : `${base}${frPath.replace(/^\//, "/")}`;
    return locale === "fr" ? frPath : enPath;
  };
  return { pathname, getLocalizedPath, currentLocale: getLocaleFromPath(pathname) };
}

interface LanguageSelectorProps {
  /** dropdown = bureau (liste déroulante) ; inline = mobile (pas de overflow coupé par le menu) */
  variant?: "dropdown" | "inline";
}

export function LanguageSelector({ variant = "dropdown" }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { getLocalizedPath, currentLocale } = useLocalizedPath();

  useEffect(() => {
    if (variant !== "dropdown") return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [variant]);

  if (variant === "inline") {
    return (
      <div
        className="flex flex-wrap items-center justify-center gap-2"
        role="navigation"
        aria-label="Choisir la langue du site"
      >
        {locales.map((locale) => {
          const active = locale === currentLocale;
          return (
            <Link
              key={locale}
              href={getLocalizedPath(locale)}
              className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                active
                  ? "border-cyan-500/40 bg-cyan-500/10 text-zinc-100"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
              }`}
            >
              <span className="mr-1.5 text-lg leading-none" aria-hidden>
                {localeFlags[locale]}
              </span>
              {localeNames[locale]}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="font-tech flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs uppercase tracking-wider text-zinc-400 transition-colors hover:bg-zinc-800/60 hover:text-zinc-200"
        aria-label={`Langue actuelle : ${localeNames[currentLocale]}. Changer de langue`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="text-lg leading-none" aria-hidden>
          {localeFlags[currentLocale]}
        </span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-[60] mt-2 min-w-[160px] rounded-md border border-zinc-800 bg-zinc-900 py-2 shadow-lg"
          aria-label="Sélectionner une langue"
        >
          {locales.map((locale) => (
            <li key={locale} role="option" aria-selected={locale === currentLocale}>
              <Link
                href={getLocalizedPath(locale)}
                className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-zinc-800/60 ${
                  locale === currentLocale
                    ? "bg-cyan-500/10 text-cyan-300"
                    : "text-zinc-400"
                }`}
                onClick={() => setOpen(false)}
              >
                <span className="text-lg leading-none">{localeFlags[locale]}</span>
                <span>{localeNames[locale]}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
