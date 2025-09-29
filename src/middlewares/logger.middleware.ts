import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

import { createLogger } from "../utils/logger";
import { requestContext } from "../utils/requestContext";

const logger = createLogger("api-gateway");

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const id = req.headers["x-request-id"]?.toString() || uuidv4();

  requestContext.run({ requestId: id }, () => {
    res.setHeader("X-Request-Id", id);

    const start = process.hrtime();

    logger.info("Incoming request", {
      context: {
        method: req.method,
        path: req.originalUrl,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    res.on("finish", () => {
      const diff = process.hrtime(start);
      const durationMs = diff[0] * 1e3 + diff[1] / 1e6;
      const level = res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";

      logger.log(level, "Request completed", {
        context: {
          method: req.method,
          path: req.originalUrl,
          statusCode: res.statusCode,
          durationMs: durationMs.toFixed(2),
        },
      });
    });

    next();
  });
}
