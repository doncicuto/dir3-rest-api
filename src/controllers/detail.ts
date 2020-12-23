import { Request, Response } from "express";

import { showErrorMessage } from "../utils/logging";
import { parseSelect } from "../utils/parseQuery";
import { Unit, UnitTypes } from "../utils/types";

// TODO:
// Here findUnique is defined with Function type because I've tried to
// use the organicUnitAGEDelegate | organicUnitCCAADelegate ... and Typescript
// throws 'Each member of the union type has signatures, but none of those
// signatures are compatible with each other'. So I've rather choose to keep
// it DRY and use Function.

export const getDetailHandler = (unitType: number) => {
  return (req: Request, res: Response) => {
    let findUnique: Function;
    switch (unitType) {
      case UnitTypes.AGE:
        findUnique = req.app.locals.prisma.organicUnitAGE.findUnique;
        break;
      case UnitTypes.CCAA:
        findUnique = req.app.locals.prisma.organicUnitCCAA.findUnique;
        break;
      case UnitTypes.EELL:
        findUnique = req.app.locals.prisma.organicUnitLocalEntity.findUnique;
        break;
      case UnitTypes.UNIV:
        findUnique = req.app.locals.prisma.organicUnitUniversity.findUnique;
        break;
      case UnitTypes.JUST:
        findUnique = req.app.locals.prisma.organicUnitJustice.findUnique;
        break;
      case UnitTypes.INST:
        findUnique = req.app.locals.prisma.organicUnitInstitution.findUnique;
        break;
      default:
        throw new Error("Wrong provided unit type");
    }

    const { id } = req.params;
    findUnique({
      select: parseSelect(req),
      where: { id: id },
    })
      .then((unit: Unit) => {
        req.app.locals.lightship.signalReady();
        if (unit) {
          res.json(unit);
        } else {
          res.status(404).send({ message: "Unit not found!" });
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
