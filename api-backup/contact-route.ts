/**
 * Backup: route API contact (Resend).
 * Non compatible avec output: "export" (GitHub Pages).
 * Pour restaurer : copier dans src/app/api/contact/route.ts
 * et déployer sur Vercel ou un hébergement avec serveur Node.
 */
import { Resend } from "resend";
import { NextResponse } from "next/server";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contact@phantomdev.fr";
const FROM_EMAIL =
  process.env.RESEND_FROM || "PhantomDev Contact <onboarding@resend.dev>";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Service email non configuré (RESEND_API_KEY)." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  let body: { name?: string; email?: string; projectType?: string; budget?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const { name, email, projectType, budget, message } = body;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Nom, email et message sont obligatoires." },
      { status: 400 }
    );
  }

  const budgetLabels: Record<string, string> = {
    "moins-5": "Moins de 5 000 €", "5-10": "5 000 € – 10 000 €",
    "10-20": "10 000 € – 20 000 €", "plus-20": "Plus de 20 000 €", "non-defini": "Non défini",
  };
  const projectTypeLabels: Record<string, string> = {
    vitrine: "Site vitrine", ecommerce: "E-commerce",
    application: "Application sur-mesure / SaaS", ia: "Intégration IA", autre: "Autre",
  };

  const html = `
    <h2>Nouvelle demande de devis — PhantomDev</h2>
    <p><strong>Nom :</strong> ${(name || "").replace(/</g, "&lt;")}</p>
    <p><strong>Email :</strong> ${(email || "").replace(/</g, "&lt;")}</p>
    <p><strong>Type :</strong> ${projectTypeLabels[projectType || ""] || projectType || "—"}</p>
    <p><strong>Budget :</strong> ${budgetLabels[budget || ""] || budget || "—"}</p>
    <h3>Message</h3>
    <pre style="white-space: pre-wrap;">${(message || "").replace(/</g, "&lt;")}</pre>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `[PhantomDev] Devis — ${name}`,
      html,
    });
    if (error) {
      return NextResponse.json({ error: "Échec de l'envoi." }, { status: 500 });
    }
    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
