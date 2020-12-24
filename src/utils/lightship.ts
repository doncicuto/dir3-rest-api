import { Request } from "express";

export const setServerReady = (req: Request) =>
  req.app.locals.lightship.signalReady();

export const setServerNotReady = (req: Request) =>
  req.app.locals.lightship.signalNotReady();
