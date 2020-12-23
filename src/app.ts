import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import { dir3Router } from "./routes/dir3";
import { showErrorMessage, showMessage } from "./utils/logging";
import { EXPRESS_PORT } from "./utils/constants";

// Load environment variables stored in .env
dotenv.config();

const app = express();

// Morgan logger
app.use(morgan<express.Request, express.Response>("combined"));

// Express Middleware
app.use(helmet());

// Express Router
app.use("/", dir3Router);

// Launch Express
app
  .listen(EXPRESS_PORT, () => {
    return showMessage(`Server is listening on port: ${EXPRESS_PORT}`);
  })
  .on("error", (err) => {
    return showErrorMessage(err);
  });
