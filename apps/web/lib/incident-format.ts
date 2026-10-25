
import type { TrustStatus } from "@/types/incident";

export function formatAge(date: string): string {
  const timestamp = new Date(date).getTime();

  if (!Number.isFinite(timestamp)) return "Time unknown";

  const minutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60000));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  return `${Math.floor(hours / 24)} days ago`;
}

export function trustLabel(status: TrustStatus): string {
  return {
    KNOWN: "Corroborated",
    PROBABLE: "Unverified report",
    OUTDATED: "Possibly outdated",
    UNKNOWN: "Verification unknown",
  }[status];
}
