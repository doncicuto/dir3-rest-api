import { Request } from "express";
import { Prisma } from "@prisma/client";

import { MAX_RESULTS_NUMBER } from "../utils/constants";
import { parseIntWithDefault } from "./parseIntWithDefault";

export const parseOffset = (req: Request) => {
  return parseIntWithDefault(req.query.offset as string, 0);
};

export const parseSelect = (req: Request) => {
  let fields: string[] = [];

  if (req.query.select && typeof req.query.select === "string") {
    fields = req.query.select.split(",");
  }

  const select = {
    id: !req.query.select || fields.includes("id"),
    description: !req.query.select || fields.includes("description"),
    level: !req.query.select || fields.includes("level"),
    type: !req.query.select || fields.includes("type"),
    provinceDesc: !req.query.select || fields.includes("provinceDesc"),
    provinceId: !req.query.select || fields.includes("provinceId"),
    hierarchicalLevel:
      !req.query.select || fields.includes("hierarchicalLevel"),
    hierarchicalSuperiorUnitId:
      !req.query.select || fields.includes("hierarchicalSuperiorUnitId"),
    hierarchicalSuperiorUnitDescription:
      !req.query.select ||
      fields.includes("hierarchicalSuperiorUnitDescription"),
    rootOrganicUnitId:
      !req.query.select || fields.includes("rootOrganicUnitId"),
    rootOrganicUnitDescription:
      !req.query.select || fields.includes("rootOrganicUnitDescription"),
    publicLawEntityIndicator:
      !req.query.select || fields.includes("publicLawEntityIndicator"),
    rootPublicLawEntityIndicatorId:
      !req.query.select || fields.includes("rootPublicLawEntityIndicatorId"),
    rootPublicLawEntityIndicatorDescription:
      !req.query.select ||
      fields.includes("rootPublicLawEntityIndicatorDescription"),
    status: !req.query.select || fields.includes("status"),
    officialCreationDate:
      !req.query.select || fields.includes("officialCreationDate"),
    nifOrCif: !req.query.select || fields.includes("nifOrCif"),
  };

  return select;
};

export const parseLimit = (req: Request) => {
  let limit = parseIntWithDefault(
    req.query.limit as string,
    MAX_RESULTS_NUMBER
  );
  if (limit > MAX_RESULTS_NUMBER) {
    limit = MAX_RESULTS_NUMBER;
  }
  return limit;
};

export const parseQueryParameters = (req: Request) => {
  let hasQueryParams = false;

  let where:
    | Prisma.OrganicUnitAGEWhereInput
    | Prisma.OrganicUnitCCAAWhereInput
    | Prisma.OrganicUnitLocalEntityWhereInput
    | Prisma.OrganicUnitUniversityWhereInput
    | Prisma.OrganicUnitJusticeWhereInput
    | Prisma.OrganicUnitInstitutionWhereInput
    | undefined = {};

  if ("description" in req.query && typeof req.query.description === "string") {
    where = {
      OR: [
        {
          description: {
            contains: req.query.description,
          },
        },
        {
          hierarchicalSuperiorUnitDescription: {
            contains: req.query.description,
          },
        },
        {
          rootOrganicUnitDescription: {
            contains: req.query.description,
          },
        },
        {
          rootPublicLawEntityIndicatorDescription: {
            contains: req.query.description,
          },
        },
      ],
    };
    hasQueryParams = true;
  }

  if ("province" in req.query && typeof req.query.province === "string") {
    where.provinceDesc = {
      contains: req.query.province,
    };
    hasQueryParams = true;
  }

  if ("provinceId" in req.query && typeof req.query.provinceId === "string") {
    let provinceId = parseInt(req.query.provinceId, 10);
    if (!isNaN(provinceId) && provinceId >= 1 && provinceId <= 52) {
      where.provinceId = {
        equals: provinceId,
      };
      hasQueryParams = true;
    }
  }

  if (
    "publicLawEntity" in req.query &&
    typeof req.query.publicLawEntity === "string" &&
    ["S", "N"].includes(req.query.publicLawEntity)
  ) {
    where.publicLawEntityIndicator = {
      equals: req.query.publicLawEntity,
    };
    hasQueryParams = true;
  }

  if (
    "status" in req.query &&
    typeof req.query.status === "string" &&
    ["V", "E", "A", "T"].includes(req.query.status)
  ) {
    where.status = {
      equals: req.query.status,
    };
    hasQueryParams = true;
  }

  if (hasQueryParams) {
    return where;
  }
  return;
};
