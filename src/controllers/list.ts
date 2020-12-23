import {
  PrismaClient,
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client";
import { Request, Response } from "express";
import { errorMonitor } from "stream";

import { showErrorMessage } from "../utils/logging";
import {
  parseSelect,
  parseOffset,
  parseLimit,
  parseQueryParameters,
} from "../utils/parseQuery";
import { Unit, UnitTypes } from "../utils/types";

// TODO:
// Here findMany is defined with any Function type because I've tried to
// use the organicUnitAGEDelegate | organicUnitCCAADelegate ... and Typescript
// throws 'Each member of the union type has signatures, but none of those
// signatures are compatible with each other'. So I've rather choose to keep
// it DRY and use Function.

export const getListHandler = (unitType: number) => {
  return (req: Request, res: Response) => {
    let findMany: Function;
    switch (unitType) {
      case UnitTypes.AGE:
        findMany = req.app.locals.prisma.organicUnitAGE.findMany;
        break;
      case UnitTypes.CCAA:
        findMany = req.app.locals.prisma.organicUnitCCAA.findMany;
        break;
      case UnitTypes.EELL:
        findMany = req.app.locals.prisma.organicUnitLocalEntity.findMany;
        break;
      case UnitTypes.UNIV:
        findMany = req.app.locals.prisma.organicUnitUniversity.findMany;
        break;
      case UnitTypes.JUST:
        findMany = req.app.locals.prisma.organicUnitJustice.findMany;
        break;
      case UnitTypes.INST:
        findMany = req.app.locals.prisma.organicUnitInstitution.findMany;
        break;
      default:
        throw new Error("Wrong provided unit type");
    }

    findMany({
      take: parseLimit(req),
      select: parseSelect(req),
      skip: parseOffset(req),
      where: parseQueryParameters(req),
    })
      .then((units: Unit[]) => {
        req.app.locals.lightship.signalReady();
        if (units.length > 0) {
          res.json(units);
        } else {
          res.json([]);
        }
      })
      .catch((error: Error) => {
        if (
          error.message.includes("database server") ||
          error.message.includes("timed out") ||
          error.message.includes("connection closed") ||
          error.message.includes("was denied access on the database") ||
          error.message.includes("opening a TLS connection") ||
          error.message.includes("database string is invalid.")
        ) {
          req.app.locals.lightship.signalNotReady();
        }
        res.status(500).send({ message: error.message });
        showErrorMessage(error);
      });
  };
};
