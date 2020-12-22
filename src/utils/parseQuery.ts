import { Request } from "express";
import { Prisma } from "@prisma/client";

import { MAX_RESULTS_NUMBER } from "../utils/constants";

export const parseOffset = (req: Request) => {
  let skip = 0;
  if (req.query.offset && typeof req.query.offset === "string") {
    skip = parseInt(req.query.offset, 10);
    if (isNaN(skip)) {
      skip = 0;
    }
  }
  return skip;
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
  let limit = MAX_RESULTS_NUMBER;
  if (req.query.limit && typeof req.query.limit === "string") {
    limit = parseInt(req.query.limit, 10);
    if (isNaN(limit) || limit > MAX_RESULTS_NUMBER) {
      limit = MAX_RESULTS_NUMBER;
    }
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

  if ("status" in req.query && typeof req.query.status === "string") {
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
