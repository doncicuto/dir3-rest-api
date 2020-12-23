export enum UnitTypes {
  AGE,
  CCAA,
  EELL,
  UNIV,
  JUST,
  INST,
}

export type Unit = {
  id: string;
  description: string;
  level: number;
  type: string;
  provinceDesc: string | null;
  provinceId: number | null;
  hierarchicalLevel: number | null;
  hierarchicalSuperiorUnitId: string;
  hierarchicalSuperiorUnitDescription: string;
  rootOrganicUnitId: string;
  rootOrganicUnitDescription: string;
  publicLawEntityIndicator: string;
  rootPublicLawEntityIndicatorId: string;
  rootPublicLawEntityIndicatorDescription: string;
  status: string;
  officialCreationDate: string | null;
  nifOrCif: string;
};
