/**
 * Web3Forms — envoi des demandes par email (recommandé, sans restriction de domaine).
 * Créez une clé sur https://web3forms.com, vérifiez contact@phantomdev.fr,
 * et définissez NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.
 */
export const WEB3FORMS_ACCESS_KEY =
  typeof process !== "undefined" ? process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "" : "";

/**
 * Formspree — alternative. Définissez NEXT_PUBLIC_FORMSPREE_ID si pas Web3Forms.
 */
export const FORMSPREE_ID =
  typeof process !== "undefined" ? process.env.NEXT_PUBLIC_FORMSPREE_ID || "" : "";

/** Un service email est configuré (Web3Forms ou Formspree) */
export const HAS_EMAIL_SERVICE = !!(WEB3FORMS_ACCESS_KEY || FORMSPREE_ID);

/**
 * Numéro WhatsApp (indicatif pays + numéro, sans + ni espaces).
 * Exemple : 33746325035 (+33 7 46 32 50 35), 13436662018 pour US/Canada.
 * Définir NEXT_PUBLIC_WHATSAPP_NUMBER dans .env.local ou sur votre hébergeur pour surcharger.
 */
const raw =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "33746325035"
    : "33746325035";
const digits = raw.replace(/\D/g, "");
export const WHATSAPP_NUMBER = digits || "33746325035";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const DEFAULT_MESSAGE =
  "Bonjour, j'aimerais demander un devis pour un projet web.";
export function getWhatsAppDevisUrl(text?: string): string {
  const message = text || DEFAULT_MESSAGE;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
