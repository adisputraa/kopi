import { Request, Response } from "express";

import { HttpStatus } from "../utils/httpStatus";

export async function routeNotFoundHandler(req: Request, res: Response) {
  res.status(HttpStatus.NOT_FOUND).json({
    message: `This endpoint was not found: ${req.path}.`,
  });
}
