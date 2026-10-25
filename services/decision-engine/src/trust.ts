
import type { TrustStatus } from "../../../packages/shared-types/src/index.js";

export function determineTrust(input: {
  source: "OFFICIAL" | "COMMUNITY" | "SYSTEM";
  reportCount: number;
  reportedAt: string;
  corroborated: boolean;
}): TrustStatus {
  const ageMinutes =
    (Date.now() - new Date(input.reportedAt).getTime()) / 60000;

  if (!Number.isFinite(ageMinutes) || ageMinutes < 0) {
    return "UNKNOWN";
  }

  if (ageMinutes > 360) return "OUTDATED";

  if (input.source === "OFFICIAL" && input.corroborated) {
    return "KNOWN";
  }

  if (input.corroborated && input.reportCount >= 2) {
    return "KNOWN";
  }

  if (input.reportCount >= 1) {
    return "PROBABLE";
  }

  return "UNKNOWN";
}
