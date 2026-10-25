
import type {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

export function notFound(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.status(404).json({
    error: "NOT_FOUND",
    message: "The requested resource was not found.",
  });
}

export const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
) => {
  console.error(error);

  res.status(500).json({
    error: "INTERNAL_SERVER_ERROR",
    message: "An unexpected server error occurred.",
  });
};
