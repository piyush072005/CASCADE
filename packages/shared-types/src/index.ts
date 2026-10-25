export type TrustStatus =
  | "KNOWN"
  | "PROBABLE"
  | "OUTDATED"
  | "UNKNOWN";

export type IncidentType =
  | "ROAD_BLOCKAGE"
  | "FLOODING"
  | "ACCIDENT"
  | "UNSAFE_AREA"
  | "TRANSPORT_ISSUE"
  | "LIGHTING_ISSUE"
  | "OTHER";

export type IncidentSeverity =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export interface Incident {
  id: string;
  title: string;
  description: string;
  type: IncidentType;
  severity: IncidentSeverity;
  trustStatus: TrustStatus;
  latitude: number | null;
  longitude: number | null;
  locationName: string;
  reportedAt: string;
  updatedAt?: string;
  expiresAt?: string;
  reportCount: number;
  source: "COMMUNITY" | "OFFICIAL" | "SYSTEM";
  imageUrl?: string;
}

export interface CreateIncidentInput {
  title: string;
  description: string;
  type: IncidentType;
  severity: IncidentSeverity;
  latitude?: number | null;
  longitude?: number | null;
  locationName: string;
}

export interface FeedbackInput {
  category:
    | "ROUTE_SAFETY"
    | "TRANSPORT"
    | "MAP_ACCURACY"
    | "INCIDENT_REPORT"
    | "APP_EXPERIENCE"
    | "OTHER";
  rating: number;
  message: string;
  journeyId?: string;
  anonymous: boolean;
}

export interface RouteRequest {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  travelMode: "WALK" | "PUBLIC_TRANSPORT" | "RIDE";
}

export interface RouteCandidate {
  id: string;
  distanceKm: number;
  estimatedMinutes: number;
  safetyScore: number;
  confidence: TrustStatus;
  warnings: string[];
}