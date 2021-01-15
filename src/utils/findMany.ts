import { Request } from "express";
import { UnitTypes } from "./types";

// TODO:
// Here findMany is defined with Function type because I've tried to
// use the organicUnitAGEDelegate | organicUnitCCAADelegate ... and Typescript
// throws 'Each member of the union type has signatures, but none of those
// signatures are compatible with each other'. So I've rather choose to keep
// it DRY and use Function.

export const getFindMany = (unitType: number, req: Request): Function => {
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
  return findMany;
};
