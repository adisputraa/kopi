import { config } from "dotenv";

import app from "./app";

import { logger } from "./utils/logger";

config();
console.log("JWT TOKEN:", process.env.SECRET_JWT_TOKEN);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info({
    service: "api",
    message: `🚀 Server started on http://localhost:${PORT}`,
    env: process.env.NODE_ENV,
  });
});

process.on("uncaughtException", (error) => {
  logger.error({
    service: "server",
    message: error.message,
    stack: error.stack,
  });

  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  const error = err as Error;

  logger.error({
    service: "server",
    message: error.message,
    stack: error.stack,
  });
});
