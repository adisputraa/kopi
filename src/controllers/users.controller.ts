import { Request, Response } from "express";

import { HttpStatus } from "../utils/httpStatus";
import { isApiError } from "../utils/apiError";
import { createLogger } from "../utils/logger";

import * as Service from "../services/users.service";
import * as Schema from "../schemas/users.schema";

export async function getUsersController(req: Request, res: Response) {
  const logger = createLogger("get-users-controller");

  try {
    logger.info("getUsersController called");
    const result = await Service.getUsersService();

    logger.info("getUsersController success", { count: result.length });
    res.status(HttpStatus.OK).json({
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    logger.error("getUsersController error", { error });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
}

export async function getUserByIdController(req: Request<Schema.GetUserByIdParamsRequest>, res: Response) {
  const logger = createLogger("get-user-by-id-controller");

  try {
    logger.info("getUserByIdController called");
    const { id } = req.params;
    const result = await Service.getUserByIdService(id);

    logger.info("getUserByIdController success", { id: result.id });
    res.status(HttpStatus.OK).json({
      message: "User retrieved successfully",
      data: result,
    });
  } catch (error) {
    if (isApiError(error)) {
      logger.warn("getUserByIdController warn", { error });
      res.status(error.statusCode).json({
        message: error.message,
      });

      return;
    }

    logger.error("getUserByIdController error", { error });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
}
