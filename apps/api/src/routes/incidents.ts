
import { Router } from "express";
import { randomUUID } from "node:crypto";
import { supabase } from "../../../../packages/database/src/client.js";

const router = Router();

const incidentTypes = [
  "ROAD_BLOCKAGE",
  "FLOODING",
  "ACCIDENT",
  "UNSAFE_AREA",
  "TRANSPORT_ISSUE",
  "LIGHTING_ISSUE",
  "OTHER",
];

const severities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

router.get("/", async (req, res, next) => {
  try {
    const limit = Math.min(
      Math.max(Number(req.query.limit || 50), 1),
      100
    );

    const { data, error } = await supabase
      .from("incidents")
      .select("*")
      .order("reported_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    res.json({ data: data ?? [] });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("incidents")
      .select("*")
      .eq("id", req.params.id)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      res.status(404).json({ error: "Incident not found" });
      return;
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body ?? {};

    if (
      typeof body.title !== "string" ||
      body.title.trim().length < 4 ||
      body.title.length > 120 ||
      typeof body.description !== "string" ||
      body.description.trim().length < 5 ||
      body.description.length > 2000 ||
      typeof body.locationName !== "string" ||
      body.locationName.trim().length < 2 ||
      body.locationName.length > 200 ||
      !incidentTypes.includes(body.type) ||
      !severities.includes(body.severity)
    ) {
      res.status(400).json({
        error: "Invalid incident details",
      });
      return;
    }

    const latitude = body.latitude ?? null;
    const longitude = body.longitude ?? null;

    if (
      (latitude === null) !== (longitude === null) ||
      (latitude !== null &&
        (!Number.isFinite(latitude) ||
          latitude < -90 ||
          latitude > 90)) ||
      (longitude !== null &&
        (!Number.isFinite(longitude) ||
          longitude < -180 ||
          longitude > 180))
    ) {
      res.status(400).json({
        error: "Invalid coordinates",
      });
      return;
    }

    const now = new Date().toISOString();

    const incident = {
      id: randomUUID(),
      title: body.title.trim(),
      description: body.description.trim(),
      type: body.type,
      severity: body.severity,
      latitude,
      longitude,
      location_name: body.locationName.trim(),
      reported_at: now,
      updated_at: now,
      expires_at: new Date(
        Date.now() + 6 * 60 * 60 * 1000
      ).toISOString(),
      report_count: 1,
      source: "COMMUNITY",
      // Never confirm a report merely because it was submitted.
      trust_status: "PROBABLE",
    };

    const { data, error } = await supabase
      .from("incidents")
      .insert(incident)
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      data,
      message: "Report received and awaiting corroboration.",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
