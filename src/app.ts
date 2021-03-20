import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { createLightship } from "lightship";

import { dir3Router } from "./routes/dir3";
import { loggerMiddleware, errorLoggerMiddleware } from "./utils/logger";
import { showErrorMessage, showMessage } from "./utils/logging";
import { EXPRESS_PORT } from "./utils/constants";

// Load environment variables stored in .env
dotenv.config();

// Create our database connection with Prisma
const prisma = new PrismaClient();
prisma
  .$connect()
  .then(() => {
    // Using lightship for readiness, liveness checks
    const lightship = createLightship();
    lightship.registerShutdownHandler(async () => {
      await prisma.$disconnect();
      server.close();
    });

    // Cors
    const corsOptions = {
      methods: "GET,HEAD,OPTIONS",
      origin: "*",
      optionsSuccessStatus: 204,
      preflightContinue: false,
      maxAge: 84600,
    };

    // Express
    const app = express();
    app.locals.prisma = prisma;
    app.locals.lightship = lightship;
    app.use(loggerMiddleware);
    app.use(errorLoggerMiddleware);
    app.use((req, resp, next) => {
      next();
    }, cors(corsOptions));
    app.use(helmet());
    app.use("/v1", dir3Router);

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
  })
  .catch((error) => {
    showErrorMessage(new Error("Could not connect to database."));
    process.exit(1);
  });
