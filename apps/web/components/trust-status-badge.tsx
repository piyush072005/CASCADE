
import type { TrustStatus } from "@/types/incident";
import { trustLabel } from "@/lib/incident-format";

const styles: Record<TrustStatus, string> = {
  KNOWN: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  PROBABLE: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  OUTDATED: "border-orange-500/30 bg-orange-500/10 text-orange-300",
  UNKNOWN: "border-slate-500/30 bg-slate-500/10 text-slate-300",
};

export function TrustStatusBadge({
  status,
}: {
  status: TrustStatus;
}) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
      title="Trust status indicates verification confidence, not a guarantee of safety."
    >
      {trustLabel(status)}
    </span>
  );
}
