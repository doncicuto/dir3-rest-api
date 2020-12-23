import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import { showErrorMessage } from "../utils/logging";
import { parseSelect } from "../utils/parseQuery";
import { Unit, UnitTypes } from "../utils/types";

const prisma = new PrismaClient();

// TODO:
// Here findUnique is defined with Function type because I've tried to
// use the organicUnitAGEDelegate | organicUnitCCAADelegate ... and Typescript
// throws 'Each member of the union type has signatures, but none of those
// signatures are compatible with each other'. So I've rather choose to keep
// it DRY and use Function.

export const getDetailHandler = (unitType: number) => {
  let findUnique: Function;
  switch (unitType) {
    case UnitTypes.AGE:
      findUnique = prisma.organicUnitAGE.findUnique;
      break;
    case UnitTypes.CCAA:
      findUnique = prisma.organicUnitCCAA.findUnique;
      break;
    case UnitTypes.EELL:
      findUnique = prisma.organicUnitLocalEntity.findUnique;
      break;
    case UnitTypes.UNIV:
      findUnique = prisma.organicUnitUniversity.findUnique;
      break;
    case UnitTypes.JUST:
      findUnique = prisma.organicUnitJustice.findUnique;
      break;
    case UnitTypes.INST:
      findUnique = prisma.organicUnitInstitution.findUnique;
      break;
  }
  return (req: Request, res: Response) => {
    const { id } = req.params;
    findUnique({
      select: parseSelect(req),
      where: { id: id },
    })
      .then((unit: Unit) => {
        if (unit) {
          res.json(unit);
        } else {
          res.status(404).send({ message: "Unit not found!" });
        }
      })
      .catch((error: Error) => {
        res.status(500).send({ message: error.message });
        showErrorMessage(error);
      });
  };
};
