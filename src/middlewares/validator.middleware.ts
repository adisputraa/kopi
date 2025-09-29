import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ZodType } from "zod";

import { HttpStatus } from "../utils/httpStatus";

export const validateRequest = (schema: ZodType, target: "body" | "query" | "params" = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const message = result.error.issues[0]?.message;

      res.status(HttpStatus.BAD_REQUEST).json({
        message,
      });

      return;
    }

    Object.assign(req[target], result.data);

    next();
  };
};

export async function validateToken(req: Request, res: Response, next: NextFunction) {
  const authorizationToken = req.headers.authorization;

  if (!authorizationToken) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      message: "Unauthorized. Token is required",
    });

    return;
  }

  if (!process.env.SECRET_JWT_TOKEN) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error: Missing JWT token secret.",
    });

    return;
  }

  try {
    const token = authorizationToken.split(" ").at(1);

    if (!token) {
      res.status(HttpStatus.FORBIDDEN).json({
        message: "Token is invalid or has expired.",
      });

      return;
    }

    const { id } = jwt.verify(token, process.env.SECRET_JWT_TOKEN) as JwtPayload;
    res.locals.tokenPayload = { id };

    next();
  } catch (error) {
    res.status(HttpStatus.FORBIDDEN).json({
      message: "Token is invalid or has expired.",
    });
  }
}
