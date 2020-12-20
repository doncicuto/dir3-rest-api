import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";

import { dir3Router } from "./routes/dir3";
import { showErrorMessage, showMessage } from "./utils/logging";

// Load environment variables stored in .env
dotenv.config();

const app = express();
const port = process.env.EXPRESS_PORT;

// Express Middleware
app.use(helmet());

// Express Router
app.use("/", dir3Router);

// Launch Express
if (port) {
  app.listen(port, () => {
    return showMessage(`Server is listening on port: ${port}`);
  });
} else {
  showErrorMessage(
    new Error(
      "Please set EXPRESS_PORT as an environment variable to specify the port number (e.g 3000)"
    )
  );
  process.exit(-1);
}
