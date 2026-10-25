
import type {
  RouteCandidate,
  RouteRequest,
} from "../../../packages/shared-types/src/index.js";
import { rankRoutes } from "./scoring.js";

export function planDemoRoutes(
  request: RouteRequest
): RouteCandidate[] {
  const { origin, destination } = request;

  const validCoordinate = (point: typeof origin) =>
    Number.isFinite(point.latitude) &&
    Number.isFinite(point.longitude) &&
    Math.abs(point.latitude) <= 90 &&
    Math.abs(point.longitude) <= 180;

  if (!validCoordinate(origin) || !validCoordinate(destination)) {
    throw new Error("Invalid origin or destination coordinates.");
  }

  const rad = (value: number) => (value * Math.PI) / 180;
  const dLat = rad(destination.latitude - origin.latitude);
  const dLon = rad(destination.longitude - origin.longitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(origin.latitude)) *
      Math.cos(rad(destination.latitude)) *
      Math.sin(dLon / 2) ** 2;

  const straightLineKm =
    6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const modeMultiplier =
    request.travelMode === "WALK" ? 1.25 : 1.4;

  const estimatedKm = straightLineKm * modeMultiplier;

  return rankRoutes([
    {
      id: "demo-route-1",
      distanceKm: Number(estimatedKm.toFixed(2)),
      estimatedMinutes: Math.max(
        1,
        Math.round(
          (estimatedKm /
            (request.travelMode === "WALK" ? 4.5 : 20)) *
            60
        )
      ),
      safetyScore: 70,
      confidence: "UNKNOWN",
      warnings: [
        "Illustrative route estimate only.",
        "No live road closures or verified street routing were checked.",
      ],
    },
  ]);
}
