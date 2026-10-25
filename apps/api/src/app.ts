
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import healthRouter from "./routes/health.js";
import incidentsRouter from "./routes/incidents.js";
import feedbackRouter from "./routes/feedback.js";
import planRouter from "./routes/plan.js";
import { errorHandler, notFound } from "./middleware/error-handler.js";
import { env } from "./config/env.js";

export const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: env.frontendOrigin }));
app.use(express.json({ limit: "1mb" }));

app.use(
  "/api",
  rateLimit({
    windowMs: 60_000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use("/api/health", healthRouter);
app.use("/api/incidents", incidentsRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/plan", planRouter);

app.use(notFound);
app.use(errorHandler);
