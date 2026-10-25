
import type { RouteCandidate } from "../../../packages/shared-types/src/index.js";

export function scoreRoute(route: RouteCandidate): number {
  const safety = Math.max(0, Math.min(100, route.safetyScore));
  const distancePenalty = Math.min(route.distanceKm * 2, 30);
  const timePenalty = Math.min(route.estimatedMinutes * 0.15, 20);

  const uncertaintyPenalty = {
    KNOWN: 0,
    PROBABLE: 8,
    OUTDATED: 18,
    UNKNOWN: 25,
  }[route.confidence];

  return Math.round(
    safety - distancePenalty - timePenalty - uncertaintyPenalty
  );
}

export function rankRoutes(routes: RouteCandidate[]) {
  return [...routes].sort((a, b) => scoreRoute(b) - scoreRoute(a));
}
