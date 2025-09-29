import express from "express";

import * as Middleware from "../middlewares/validator.middleware";
import * as Controller from "../controllers/users.controller";
import * as Schema from "../schemas/users.schema";

const router = express.Router();

router.get("/users", Controller.getUsersController);
router.get("/users/:id", Middleware.validateRequest(Schema.GetUserByIdParamsSchema, "params"), Controller.getUserByIdController);

export default router;
