import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import { showErrorMessage } from "../utils/logging";
import { parseSelect } from "../utils/parseQuery";
import { Units } from "../utils/types";

const prisma = new PrismaClient();

export const getDetailHandler = (unitType: number) => {
  return (req: Request, res: Response) => {
    const { id } = req.params;

    switch (unitType) {
      case Units.AGE:
        prisma.organicUnitAGE
          .findUnique({
            select: parseSelect(req),
            where: { id: id },
          })
          .then((unit) => {
            if (unit) {
              res.json(unit);
            } else {
              res.status(404).send({ message: "Unit not found!" });
            }
          })
          .catch((error) => {
            res.status(500).send({ message: error.message });
            showErrorMessage(error);
          });
        break;
      case Units.CCAA:
        prisma.organicUnitCCAA
          .findUnique({
            select: parseSelect(req),
            where: { id: id },
          })
          .then((unit) => {
            if (unit) {
              res.json(unit);
            } else {
              res.status(404).send({ message: "Unit not found!" });
            }
          })
          .catch((error) => {
            res.status(500).send({ message: error.message });
            showErrorMessage(error);
          });
        break;
      case Units.EELL:
        prisma.organicUnitLocalEntity
          .findUnique({
            select: parseSelect(req),
            where: { id: id },
          })
          .then((unit) => {
            if (unit) {
              res.json(unit);
            } else {
              res.status(404).send({ message: "Unit not found!" });
            }
          })
          .catch((error) => {
            res.status(500).send({ message: error.message });
          });
        break;
      case Units.UNIV:
        prisma.organicUnitUniversity
          .findUnique({
            select: parseSelect(req),
            where: { id: id },
          })
          .then((unit) => {
            if (unit) {
              res.json(unit);
            } else {
              res.status(404).send({ message: "Unit not found!" });
            }
          })
          .catch((error) => {
            res.status(500).send({ message: error.message });
            showErrorMessage(error);
          });
        break;
      case Units.JUST:
        prisma.organicUnitJustice
          .findUnique({
            select: parseSelect(req),
            where: { id: id },
          })
          .then((unit) => {
            if (unit) {
              res.json(unit);
            } else {
              res.status(404).send({ message: "Unit not found!" });
            }
          })
          .catch((error) => {
            res.status(500).send({ message: error.message });
            showErrorMessage(error);
          });
        break;
      case Units.INST:
        prisma.organicUnitInstitution
          .findUnique({
            select: parseSelect(req),
            where: { id: id },
          })
          .then((unit) => {
            if (unit) {
              res.json(unit);
            } else {
              res.status(404).send({ message: "Unit not found!" });
            }
          })
          .catch((error) => {
            res.status(500).send({ message: error.message });
            showErrorMessage(error);
          });
        break;
    }
  };
};
