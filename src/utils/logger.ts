import winston from "winston";

import { getRequestId } from "./requestContext";

const { combine, timestamp, errors, colorize, printf } = winston.format;

const consoleFormat = printf((info) => {
  const { timestamp, level, message, ...rest } = info;

  if (rest.error instanceof Error) {
    rest.error = {
      message: rest.error.message,
      stack: rest.error.stack,
    };
  }

  const metaStr = Object.keys(rest).length ? JSON.stringify(rest, null, 2) : "";

  return `${timestamp} [${level}] ${message}${metaStr ? `\n${metaStr}` : ""}`;
});

const consoleTransport = new winston.transports.Console({
  format: combine(
    colorize(),
    timestamp(),
    errors({
      stack: true,
    }),
    consoleFormat
  ),
});

export const logger = winston.createLogger({
  level: "info",
  transports: [consoleTransport],
});

function withRequestId(meta: Record<string, any> = {}) {
  const reqId = getRequestId();

  return reqId ? { requestId: reqId, ...meta } : meta;
}

export function createLogger(service: string) {
  return {
    info: (msg: string, meta: Record<string, any> = {}) => logger.info({ message: msg, service, ...withRequestId(meta) }),
    warn: (msg: string, meta: Record<string, any> = {}) => logger.warn({ message: msg, service, ...withRequestId(meta) }),
    error: (msg: string, meta: Record<string, any> = {}) => logger.error({ message: msg, service, ...withRequestId(meta) }),
    log: (level: string, msg: string, meta: Record<string, any> = {}) => logger.log(level, { message: msg, service, ...withRequestId(meta) }),
  };
}
