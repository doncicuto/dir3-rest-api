import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";

import { dir3Router } from "./routes/dir3";
import { showMessage } from "./utils/logging";
import { EXPRESS_PORT } from "./utils/constants";

// Load environment variables stored in .env
dotenv.config();

const app = express();

// Express Middleware
app.use(helmet());

// Express Router
app.use("/", dir3Router);

// Launch Express
app.listen(EXPRESS_PORT, () => {
  return showMessage(`Server is listening on port: ${EXPRESS_PORT}`);
});
