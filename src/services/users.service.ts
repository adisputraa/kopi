import { HttpStatus } from "../utils/httpStatus";
import { createApiError } from "../utils/apiError";
import { createLogger } from "../utils/logger";

import * as Repository from "../repositories/users.repository";

export async function getUsersService() {
  const logger = createLogger("get-users-service");

  logger.info("getUsersService called");
  const result = await Repository.findAll();

  logger.info("getUsersService result", { count: result.length });
  return result;
}

export async function getUserByIdService(id: string) {
  const logger = createLogger("get-user-by-id-service");

  logger.info("getUserByIdService called", { id });
  const result = await Repository.findById(id);

  if (!result) {
    logger.warn("User not found", { id });
    throw createApiError("User not found", HttpStatus.NOT_FOUND);
  }

  logger.info("getUserByIdService result", { id: result.id });
  return result;
}
