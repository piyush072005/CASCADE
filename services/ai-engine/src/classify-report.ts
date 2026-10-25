
import type {
  IncidentSeverity,
  IncidentType,
} from "../../../packages/shared-types/src/index.js";

export function classifyReport(text: string): {
  type: IncidentType;
  severity: IncidentSeverity;
  needsReview: boolean;
} {
  const value = text.toLowerCase();

  const matches: Array<{
    keywords: string[];
    type: IncidentType;
  }> = [
    {
      keywords: ["flood", "waterlogging", "water logged", "water on road"],
      type: "FLOODING",
    },
    {
      keywords: ["accident", "crash", "collision"],
      type: "ACCIDENT",
    },
    {
      keywords: ["blocked", "road closed", "barricade", "roadblock"],
      type: "ROAD_BLOCKAGE",
    },
    {
      keywords: ["unsafe", "harassment", "threatening"],
      type: "UNSAFE_AREA",
    },
    {
      keywords: ["bus unavailable", "train cancelled", "transport stopped"],
      type: "TRANSPORT_ISSUE",
    },
    {
      keywords: ["dark street", "no streetlight", "street lights off"],
      type: "LIGHTING_ISSUE",
    },
  ];

  const match = matches.find((item) =>
    item.keywords.some((keyword) => value.includes(keyword))
  );

  const severity: IncidentSeverity =
    /trapped|life.?threatening|seriously injured|major accident/.test(value)
      ? "CRITICAL"
      : /injured|heavy flooding|completely blocked/.test(value)
        ? "HIGH"
        : match
          ? "MEDIUM"
          : "LOW";

  return {
    type: match?.type ?? "OTHER",
    severity,
    // Classification is a suggestion, not a verified fact.
    needsReview: true,
  };
}
