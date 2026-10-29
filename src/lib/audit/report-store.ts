import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { get, put } from "@vercel/blob";
import type { AuditReport } from "@/lib/audit/types";

const LOCAL_DIR = path.join(process.cwd(), ".audit-reports");
const BLOB_PREFIX = "audit-reports";

function blobPath(sessionId: string) {
  return `${BLOB_PREFIX}/${sessionId}.json`;
}

async function saveLocal(sessionId: string, report: AuditReport): Promise<void> {
  await mkdir(LOCAL_DIR, { recursive: true });
  await writeFile(path.join(LOCAL_DIR, `${sessionId}.json`), JSON.stringify(report), "utf8");
}

async function loadLocal(sessionId: string): Promise<AuditReport | null> {
  try {
    const raw = await readFile(path.join(LOCAL_DIR, `${sessionId}.json`), "utf8");
    return JSON.parse(raw) as AuditReport;
  } catch {
    return null;
  }
}

export async function saveAuditReport(sessionId: string, report: AuditReport): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const payload = JSON.stringify(report);

  if (token) {
    await put(blobPath(sessionId), payload, {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
    });
    return;
  }

  await saveLocal(sessionId, report);
}

export async function loadAuditReport(sessionId: string): Promise<AuditReport | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  let report: AuditReport | null = null;

  if (token) {
    try {
      const result = await get(blobPath(sessionId), { access: "private", token });
      if (result) {
        const text = await new Response(result.stream).text();
        report = JSON.parse(text) as AuditReport;
      }
    } catch {
      report = null;
    }
  } else {
    report = await loadLocal(sessionId);
  }

  if (!report) return null;

  if (report.meta.expiresAt && new Date(report.meta.expiresAt) < new Date()) {
    return null;
  }

  return report;
}
