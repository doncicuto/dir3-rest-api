import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import { showErrorMessage } from "../utils/logging";
import {
  parseSelect,
  parseOffset,
  parseLimit,
  parseQueryParameters,
} from "../utils/parseQuery";
import { Unit, UnitTypes } from "../utils/types";

const prisma = new PrismaClient();

// TODO:
// Here findMany is defined with any Function type because I've tried to
// use the organicUnitAGEDelegate | organicUnitCCAADelegate ... and Typescript
// throws 'Each member of the union type has signatures, but none of those
// signatures are compatible with each other'. So I've rather choose to keep
// it DRY and use Function.

export const getListHandler = (unitType: number) => {
  let findMany: any;
  switch (unitType) {
    case UnitTypes.AGE:
      findMany = prisma.organicUnitAGE.findMany;
      break;
    case UnitTypes.CCAA:
      findMany = prisma.organicUnitCCAA.findMany;
      break;
    case UnitTypes.EELL:
      findMany = prisma.organicUnitLocalEntity.findMany;
      break;
    case UnitTypes.UNIV:
      findMany = prisma.organicUnitUniversity.findMany;
      break;
    case UnitTypes.JUST:
      findMany = prisma.organicUnitJustice.findMany;
      break;
    case UnitTypes.INST:
      findMany = prisma.organicUnitInstitution.findMany;
      break;
  }
  return (req: Request, res: Response) => {
    findMany({
      take: parseLimit(req),
      select: parseSelect(req),
      skip: parseOffset(req),
      where: parseQueryParameters(req),
    })
      .then((units: Unit[]) => {
        if (units.length > 0) {
          res.json(units);
        } else {
          res.json([]);
        }
      })
      .catch((error: Error) => {
        res.status(500).send({ message: error.message });
        showErrorMessage(error);
      });
  };
};
