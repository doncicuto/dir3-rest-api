import { Request } from "express";
import { UnitTypes } from "./types";

// TODO:
// Here findUnique is defined with Function type because I've tried to
// use the organicUnitAGEDelegate | organicUnitCCAADelegate ... and Typescript
// throws 'Each member of the union type has signatures, but none of those
// signatures are compatible with each other'. So I've rather choose to keep
// it DRY and use Function.

export const getFindUnique = (unitType: number, req: Request): Function => {
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
  return findUnique;
};
