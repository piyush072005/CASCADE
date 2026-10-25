
import { Router } from "express";
import { supabase } from "../../../../packages/database/src/client.js";

const router = Router();

const categories = [
  "ROUTE_SAFETY",
  "TRANSPORT",
  "MAP_ACCURACY",
  "INCIDENT_REPORT",
  "APP_EXPERIENCE",
  "OTHER",
];

router.post("/", async (req, res, next) => {
  try {
    const { category, rating, message, journeyId, anonymous } =
      req.body ?? {};

    if (
      !categories.includes(category) ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5 ||
      typeof message !== "string" ||
      message.trim().length > 2000 ||
      typeof anonymous !== "boolean"
    ) {
      res.status(400).json({ error: "Invalid feedback details" });
      return;
    }

    const { data, error } = await supabase
      .from("feedback")
      .insert({
        category,
        rating,
        message: message.trim(),
        journey_id: journeyId || null,
        anonymous,
        status: "RECEIVED",
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
});

export default router;
