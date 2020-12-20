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
            res.json(unit);
          })
          .catch((error) => {
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
            res.json(unit);
          })
          .catch((error) => {
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
            res.json(unit);
          })
          .catch((error) => {
            showErrorMessage(error);
          });
        break;
      case Units.UNIV:
        prisma.organicUnitUniversity
          .findUnique({
            select: parseSelect(req),
            where: { id: id },
          })
          .then((unit) => {
            res.json(unit);
          })
          .catch((error) => {
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
            res.json(unit);
          })
          .catch((error) => {
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
            res.json(unit);
          })
          .catch((error) => {
            showErrorMessage(error);
          });
        break;
    }
  };
};
