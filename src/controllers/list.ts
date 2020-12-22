import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import { showErrorMessage } from "../utils/logging";
import {
  parseSelect,
  parseOffset,
  parseLimit,
  parseQueryParameters,
} from "../utils/parseQuery";
import { Units } from "../utils/types";

const prisma = new PrismaClient();

export const getListHandler = (unitType: number) => {
  return (req: Request, res: Response) => {
    switch (unitType) {
      case Units.AGE:
        prisma.organicUnitAGE
          .findMany({
            take: parseLimit(req),
            select: parseSelect(req),
            skip: parseOffset(req),
            where: parseQueryParameters(req),
          })
          .then((units) => {
            if (units.length > 0) {
              res.json(units);
            } else {
              res.json([]);
            }
          })
          .catch((error) => {
            res.status(500).send({ message: error.message });
            showErrorMessage(error);
          });
        break;
      case Units.CCAA:
        prisma.organicUnitCCAA
          .findMany({
            take: parseLimit(req),
            select: parseSelect(req),
            skip: parseOffset(req),
            where: parseQueryParameters(req),
          })
          .then((units) => {
            if (units.length > 0) {
              res.json(units);
            } else {
              res.json([]);
            }
          })
          .catch((error) => {
            res.status(500).send({ message: error.message });
            showErrorMessage(error);
          });
        break;
      case Units.EELL:
        prisma.organicUnitLocalEntity
          .findMany({
            take: parseLimit(req),
            select: parseSelect(req),
            skip: parseOffset(req),
            where: parseQueryParameters(req),
          })
          .then((units) => {
            if (units.length > 0) {
              res.json(units);
            } else {
              res.json([]);
            }
          })
          .catch((error) => {
            res.status(500).send({ message: error.message });
            showErrorMessage(error);
          });
        break;
      case Units.UNIV:
        prisma.organicUnitUniversity
          .findMany({
            take: parseLimit(req),
            select: parseSelect(req),
            skip: parseOffset(req),
            where: parseQueryParameters(req),
          })
          .then((units) => {
            if (units.length > 0) {
              res.json(units);
            } else {
              res.json([]);
            }
          })
          .catch((error) => {
            res.status(500).send({ message: error.message });
            showErrorMessage(error);
          });
        break;
      case Units.JUST:
        prisma.organicUnitJustice
          .findMany({
            take: parseLimit(req),
            select: parseSelect(req),
            skip: parseOffset(req),
            where: parseQueryParameters(req),
          })
          .then((units) => {
            if (units.length > 0) {
              res.json(units);
            } else {
              res.json([]);
            }
          })
          .catch((error) => {
            res.status(500).send({ message: error.message });
            showErrorMessage(error);
          });
        break;
      case Units.INST:
        prisma.organicUnitInstitution
          .findMany({
            take: parseLimit(req),
            select: parseSelect(req),
            skip: parseOffset(req),
            where: parseQueryParameters(req),
          })
          .then((units) => {
            if (units.length > 0) {
              res.json(units);
            } else {
              res.json([]);
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
