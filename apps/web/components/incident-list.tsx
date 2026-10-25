
"use client";

import { useEffect, useState } from "react";
import type { Incident, IncidentType, TrustStatus } from "@/types/incident";
import { getIncidents } from "@/lib/incident-api";
import { formatAge } from "@/lib/incident-format";
import { TrustStatusBadge } from "@/components/trust-status-badge";

const types: Array<IncidentType | "ALL"> = [
  "ALL",
  "ROAD_BLOCKAGE",
  "FLOODING",
  "ACCIDENT",
  "UNSAFE_AREA",
  "TRANSPORT_ISSUE",
  "LIGHTING_ISSUE",
  "OTHER",
];

export function IncidentList() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [type, setType] = useState<IncidentType | "ALL">("ALL");
  const [trust, setTrust] = useState<TrustStatus | "ALL">("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");

    try {
      const result = await getIncidents();
      setIncidents(result);
    } catch {
      setError(
        "Incident data could not be loaded. Check the API connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const visible = incidents.filter((incident) => {
    const typeMatch = type === "ALL" || incident.type === type;
    const trustMatch = trust === "ALL" || incident.trustStatus === trust;
    return typeMatch && trustMatch;
  });

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <label className="text-sm">
          Incident type
          <select
            className="ml-2 rounded-lg border border-slate-700 bg-slate-900 p-2"
            value={type}
            onChange={(event) =>
              setType(event.target.value as IncidentType | "ALL")
            }
          >
            {types.map((item) => (
              <option key={item} value={item}>
                {item === "ALL" ? "All types" : item.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          Trust status
          <select
            className="ml-2 rounded-lg border border-slate-700 bg-slate-900 p-2"
            value={trust}
            onChange={(event) =>
              setTrust(event.target.value as TrustStatus | "ALL")
            }
          >
            <option value="ALL">All statuses</option>
            <option value="KNOWN">Corroborated</option>
            <option value="PROBABLE">Unverified</option>
            <option value="OUTDATED">Possibly outdated</option>
            <option value="UNKNOWN">Unknown</option>
          </select>
        </label>

        <button
          type="button"
          onClick={() => void load()}
          className="rounded-lg border border-slate-700 px-3 py-2 text-sm"
        >
          Refresh
        </button>
      </div>

      {loading && <p role="status">Loading incident reports…</p>}

      {!loading && error && (
        <div className="rounded-xl border border-red-500/30 p-4">
          <p>{error}</p>
          <button
            type="button"
            className="mt-3 underline"
            onClick={() => void load()}
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && visible.length === 0 && (
        <p className="rounded-xl border border-slate-700 p-5 text-slate-400">
          No reports match these filters.
        </p>
      )}

      {!loading && !error && (
        <div className="grid gap-4 md:grid-cols-2">
          {visible.map((incident) => (
            <article
              key={incident.id}
              className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="font-semibold">{incident.title}</h2>
                <TrustStatusBadge status={incident.trustStatus} />
              </div>

              <p className="text-sm text-slate-300">
                {incident.description}
              </p>

              <p className="text-sm text-slate-400">
                {incident.locationName}
              </p>

              <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                <span>{incident.type.replaceAll("_", " ")}</span>
                <span>·</span>
                <span>Severity: {incident.severity}</span>
                <span>·</span>
                <span>{formatAge(incident.reportedAt)}</span>
              </div>

              <p className="text-xs text-slate-500">
                {incident.reportCount} report(s). Trust status is not a
                guarantee of safety.
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
