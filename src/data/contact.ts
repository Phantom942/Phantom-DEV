/**
 * Numéro WhatsApp (indicatif pays + numéro, sans + ni espaces).
 * Exemple : 33612345678 pour la France, 13436662018 pour US/Canada.
 * Définir NEXT_PUBLIC_WHATSAPP_NUMBER dans .env.local ou sur votre hébergeur.
 */
const raw =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "13436662018"
    : "13436662018";
const digits = raw.replace(/\D/g, "");
export const WHATSAPP_NUMBER = digits || "13436662018";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const DEFAULT_MESSAGE =
  "Bonjour, j'aimerais demander un devis pour un projet web.";
export function getWhatsAppDevisUrl(text?: string): string {
  const message = text || DEFAULT_MESSAGE;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
