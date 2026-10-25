
import { supabase } from "../../../packages/database/src/client.js";

export async function getRecentCommunityReports(limit = 100) {
  const safeLimit = Math.min(Math.max(Math.floor(limit), 1), 100);

  const { data, error } = await supabase
    .from("incidents")
    .select(
      "id,title,description,type,severity,trust_status,latitude,longitude,location_name,reported_at,expires_at,report_count,source"
    )
    .eq("source", "COMMUNITY")
    .order("reported_at", { ascending: false })
    .limit(safeLimit);

  if (error) {
    throw new Error(`Could not load community reports: ${error.message}`);
  }

  return (data ?? []).map((report) => {
    const expired =
      report.expires_at &&
      new Date(report.expires_at).getTime() < Date.now();

    return {
      ...report,
      trust_status: expired ? "OUTDATED" : report.trust_status,
    };
  });
}
