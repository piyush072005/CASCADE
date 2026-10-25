
import { Router } from "express";
import { planDemoRoutes } from "../../../../services/decision-engine/src/planner.js";

const router = Router();

router.post("/", (req, res, next) => {
  try {
    const { origin, destination, travelMode } = req.body ?? {};

    if (
      !origin ||
      !destination ||
      !["WALK", "PUBLIC_TRANSPORT", "RIDE"].includes(travelMode)
    ) {
      res.status(400).json({ error: "Invalid route request" });
      return;
    }

    const routes = planDemoRoutes({
      origin,
      destination,
      travelMode,
    });

    res.json({
      data: routes,
      mode: "DEMO",
      disclaimer:
        "These are illustrative estimates, not verified safe routes or live traffic directions.",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
