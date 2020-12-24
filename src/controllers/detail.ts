import { Request, Response } from "express";
import { isDBConnectionError } from "../utils/databaseErrors";
import { getFindUnique } from "../utils/findUnique";
import { setServerNotReady, setServerReady } from "../utils/lightship";

import { showErrorMessage } from "../utils/logging";
import { parseSelect } from "../utils/parseQuery";
import { Unit } from "../utils/types";

export const getDetailHandler = (unitType: number) => {
  return (req: Request, res: Response) => {
    const findUnique = getFindUnique(unitType, req);

    const { id } = req.params;
    findUnique({
      select: parseSelect(req),
      where: { id: id },
    })
      .then((unit: Unit) => {
        setServerReady(req);
        if (unit) {
          res.json(unit);
        } else {
          res.status(404).send({ message: "Unit not found!" });
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
