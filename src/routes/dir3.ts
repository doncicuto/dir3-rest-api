import express from "express";
import swaggerUi from "swagger-ui-express";

import { getListHandler } from "../controllers/list";
import { getDetailHandler } from "../controllers/detail";
import { swaggerSpec } from "../swagger-spec";
import { UnitTypes } from "../utils/types";

export const dir3Router = express.Router();

/**
 * @openapi
 * /v1/units-age:
 *   get:
 *     tags: [Units - AGE]
 *     summary: List of AGE units
 *     description: Returns General State Administration Units
 *     parameters:
 *        - $ref: '#/components/parameters/selectParam'
 *        - $ref: '#/components/parameters/offsetParam'
 *        - $ref: '#/components/parameters/limitParam'
 *        - $ref: '#/components/parameters/descriptionParam'
 *        - $ref: '#/components/parameters/publicLawEntityParam'
 *        - $ref: '#/components/parameters/statusParam'
 *     responses:
 *       200:
 *        $ref: '#/components/responses/Units'
 */
dir3Router.get("/units-age", getListHandler(UnitTypes.AGE));

/**
 * @openapi
 * /v1/units-age/{id}:
 *   get:
 *     tags: [Units - AGE]
 *     summary: AGE unit detail
 *     description: Retrieve a single AGE unit identified by its `id` (DIR3 code).
 *     parameters:
 *        - $ref: '#/components/parameters/idAGE'
 *        - $ref: '#/components/parameters/selectParam'
 *     responses:
 *       200:
 *        $ref: '#/components/responses/Unit'
 */

dir3Router.get("/units-age/:id", getDetailHandler(UnitTypes.AGE));

/**
 * @openapi
 * /v1/units-ccaa:
 *   get:
 *     tags: [Units - CCAA]
 *     summary: List of CCAA (Autonomous Communities) units
 *     description: Returns Autonomous Communities Units
 *     parameters:
 *        - $ref: '#/components/parameters/selectParam'
 *        - $ref: '#/components/parameters/offsetParam'
 *        - $ref: '#/components/parameters/limitParam'
 *        - $ref: '#/components/parameters/descriptionParam'
 *        - $ref: '#/components/parameters/publicLawEntityParam'
 *        - $ref: '#/components/parameters/statusParam'
 *     responses:
 *       200:
 *        $ref: '#/components/responses/Units'
 */
dir3Router.get("/units-ccaa", getListHandler(UnitTypes.CCAA));

/**
 * @openapi
 * /v1/units-ccaa/{id}:
 *   get:
 *     tags: [Units - CCAA]
 *     summary: CCAA (Autonomous Community) unit detail
 *     description: Retrieve a single CCAA unit identified by its `id` (DIR3 code).
 *     parameters:
 *        - $ref: '#/components/parameters/idCCAA'
 *        - $ref: '#/components/parameters/selectParam'
 *     responses:
 *       200:
 *        $ref: '#/components/responses/Unit'
 *       400:
 *        description: Unit not found
 */

dir3Router.get("/units-ccaa/:id", getDetailHandler(UnitTypes.CCAA));

/**
 * @openapi
 * /v1/units-eell:
 *   get:
 *     tags: [Units - EELL]
 *     summary: List of EELL (Local Entities) units
 *     description: Returns Local Entities Units
 *     parameters:
 *        - $ref: '#/components/parameters/selectParam'
 *        - $ref: '#/components/parameters/offsetParam'
 *        - $ref: '#/components/parameters/limitParam'
 *        - $ref: '#/components/parameters/descriptionParam'
 *        - $ref: '#/components/parameters/provinceParam'
 *        - $ref: '#/components/parameters/provinceIdParam'
 *        - $ref: '#/components/parameters/publicLawEntityParam'
 *        - $ref: '#/components/parameters/statusParam'
 *     responses:
 *       200:
 *        $ref: '#/components/responses/Units'
 */
dir3Router.get("/units-eell", getListHandler(UnitTypes.EELL));

/**
 * @openapi
 * /v1/units-eell/{id}:
 *   get:
 *     tags: [Units - EELL]
 *     summary: EELL (Local Entity) unit detail
 *     description: Retrieve a single Local Entity unit identified by its `id` (DIR3 code).
 *     parameters:
 *        - $ref: '#/components/parameters/idEELL'
 *        - $ref: '#/components/parameters/selectParam'
 *     responses:
 *       200:
 *        $ref: '#/components/responses/Unit'
 *       400:
 *        description: Unit not found
 */

dir3Router.get("/units-eell/:id", getDetailHandler(UnitTypes.EELL));

/**
 * @openapi
 * /v1/units-universities:
 *   get:
 *     tags: [Units - Universities]
 *     summary: List of Universities units
 *     description: Returns Universities Units
 *     parameters:
 *        - $ref: '#/components/parameters/selectParam'
 *        - $ref: '#/components/parameters/offsetParam'
 *        - $ref: '#/components/parameters/limitParam'
 *        - $ref: '#/components/parameters/descriptionParam'
 *        - $ref: '#/components/parameters/publicLawEntityParam'
 *        - $ref: '#/components/parameters/statusParam'
 *     responses:
 *       200:
 *        $ref: '#/components/responses/Units'
 */
dir3Router.get("/units-universities", getListHandler(UnitTypes.UNIV));

/**
 * @openapi
 * /v1/units-universities/{id}:
 *   get:
 *     tags: [Units - Universities]
 *     summary: University unit detail
 *     description: Retrieve a single University unit identified by its `id` (DIR3 code).
 *     parameters:
 *        - $ref: '#/components/parameters/idUniversity'
 *        - $ref: '#/components/parameters/selectParam'
 *     responses:
 *       200:
 *        $ref: '#/components/responses/Unit'
 *       400:
 *        description: Unit not found
 */

dir3Router.get("/units-universities/:id", getDetailHandler(UnitTypes.UNIV));

/**
 * @openapi
 * /v1/units-justice:
 *   get:
 *     tags: [Units - Justice]
 *     summary: List of Justice units
 *     description: Returns Justice Units
 *     parameters:
 *        - $ref: '#/components/parameters/selectParam'
 *        - $ref: '#/components/parameters/offsetParam'
 *        - $ref: '#/components/parameters/limitParam'
 *        - $ref: '#/components/parameters/descriptionParam'
 *        - $ref: '#/components/parameters/publicLawEntityParam'
 *        - $ref: '#/components/parameters/statusParam'
 *     responses:
 *       200:
 *        $ref: '#/components/responses/Units'
 */
dir3Router.get("/units-justice", getListHandler(UnitTypes.JUST));

/**
 * @openapi
 * /v1/units-justice/{id}:
 *   get:
 *     tags: [Units - Justice]
 *     summary: Justice unit detail
 *     description: Retrieve a single Justice unit identified by its `id` (DIR3 code).
 *     parameters:
 *        - $ref: '#/components/parameters/idJustice'
 *        - $ref: '#/components/parameters/selectParam'
 *     responses:
 *       200:
 *        $ref: '#/components/responses/Unit'
 *       400:
 *        description: Unit not found
 */

dir3Router.get("/units-justice/:id", getDetailHandler(UnitTypes.JUST));

/**
 * @openapi
 * /v1/units-other-institutions:
 *   get:
 *     tags: [Units - Other Institutions]
 *     summary: List of Other Institutions units
 *     description: Returns Other Institutions Units
 *     parameters:
 *        - $ref: '#/components/parameters/selectParam'
 *        - $ref: '#/components/parameters/offsetParam'
 *        - $ref: '#/components/parameters/limitParam'
 *        - $ref: '#/components/parameters/descriptionParam'
 *        - $ref: '#/components/parameters/publicLawEntityParam'
 *        - $ref: '#/components/parameters/statusParam'
 *     responses:
 *       200:
 *        $ref: '#/components/responses/Units'
 */
dir3Router.get("/units-other-institutions", getListHandler(UnitTypes.INST));

/**
 * @openapi
 * /v1/units-other-institutions/{id}:
 *   get:
 *     tags: [Units - Other Institutions]
 *     summary: Other institution unit detail
 *     description: Retrieve a single institution unit identified by its `id` (DIR3 code).
 *     parameters:
 *        - $ref: '#/components/parameters/idInstitution'
 *        - $ref: '#/components/parameters/selectParam'
 *     responses:
 *       200:
 *        $ref: '#/components/responses/Unit'
 *       400:
 *        description: Unit not found
 */
dir3Router.get(
  "/units-other-institutions/:id",
  getDetailHandler(UnitTypes.INST)
);

// Swagger API docs endpoint
dir3Router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
