import express from "express";

import { getListHandler } from "../controllers/list";
import { getDetailHandler } from "../controllers/detail";
import { Units } from "../utils/types";

export const dir3Router = express.Router();

dir3Router.get("/units-age", getListHandler(Units.AGE));
dir3Router.get("/units-age/:id", getDetailHandler(Units.AGE));
dir3Router.get("/units-ccaa", getListHandler(Units.CCAA));
dir3Router.get("/units-ccaa/:id", getDetailHandler(Units.CCAA));
dir3Router.get("/units-eell", getListHandler(Units.EELL));
dir3Router.get("/units-eell/:id", getDetailHandler(Units.EELL));
dir3Router.get("/units-universities", getListHandler(Units.UNIV));
dir3Router.get("/units-universities/:id", getDetailHandler(Units.UNIV));
dir3Router.get("/units-justice", getListHandler(Units.JUST));
dir3Router.get("/units-justice/:id", getDetailHandler(Units.JUST));
dir3Router.get("/units-other-institutions", getListHandler(Units.INST));
dir3Router.get("/units-other-institutions/:id", getDetailHandler(Units.INST));
