import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import swaggerUi from "swagger-ui-express";

import * as LoggerMiddleware from "./middlewares/logger.middleware";
import * as NotFoundMiddleware from "./middlewares/notfound.middleware";

import UsersRoute from "./routes/users.route";
import AuthRoute from "./routes/auth.route";

import { openApiSpec } from "../docs/openApi";

const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded());
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());

app.use(LoggerMiddleware.requestLogger);
app.use("/api/v1/users", UsersRoute);
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.use(NotFoundMiddleware.routeNotFoundHandler);

export default app;
