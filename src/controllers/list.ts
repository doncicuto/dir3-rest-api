import { Request, Response } from "express";
import { getFindMany } from "../utils/findMany";
import { setServerNotReady, setServerReady } from "../utils/lightship";

import { showErrorMessage } from "../utils/logging";
import { isDBConnectionError } from "../utils/databaseErrors";

import {
  parseSelect,
  parseOffset,
  parseLimit,
  parseQueryParameters,
} from "../utils/parseQuery";
import { Unit } from "../utils/types";

// TODO:
// Here findMany is defined with any Function type because I've tried to
// use the organicUnitAGEDelegate | organicUnitCCAADelegate ... and Typescript
// throws 'Each member of the union type has signatures, but none of those
// signatures are compatible with each other'. So I've rather choose to keep
// it DRY and use Function.

export const getListHandler = (unitType: number) => {
  return (req: Request, res: Response) => {
    const findMany = getFindMany(unitType, req);

    findMany({
      take: parseLimit(req),
      select: parseSelect(req),
      skip: parseOffset(req),
      where: parseQueryParameters(req),
    })
      .then((units: Unit[]) => {
        setServerReady(req);
        if (units.length > 0) {
          res.json(units);
        } else {
          res.json([]);
        }
      })
      .catch((error: Error) => {
        if (isDBConnectionError(error)) {
          setServerNotReady(req);
        }
        res.status(500).json({ message: error.message });
        showErrorMessage(error);
      });
  };
};
