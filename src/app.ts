import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import { createLightship } from "lightship";

import { dir3Router } from "./routes/dir3";
import { showErrorMessage, showMessage } from "./utils/logging";
import { EXPRESS_PORT } from "./utils/constants";

// Load environment variables stored in .env
dotenv.config();

// Create our database connection with Prisma
const prisma = new PrismaClient();

// Using lightship for readiness, liveness checks
const lightship = createLightship();
lightship.registerShutdownHandler(async () => {
  await prisma.$disconnect();
  server.close();
});

// Express
const app = express();

// Morgan logger
app.use(morgan<express.Request, express.Response>("combined"));

// Express Middleware
app.use(helmet());

// Share our prisma client and lightship with our Express routers
app.locals.prisma = prisma;
app.locals.lightship = lightship;

// Express Router
app.use("/", dir3Router);

// Launch Express
const server = app
  .listen(EXPRESS_PORT, () => {
    lightship.signalReady();
    return showMessage(`Server is listening on port: ${EXPRESS_PORT}`);
  })
  .on("error", async (err) => {
    await prisma.$disconnect();
    return showErrorMessage(err);
  });
