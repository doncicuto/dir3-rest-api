import { parseIntWithDefault } from "./parseIntWithDefault";

export const MAX_RESULTS_NUMBER = parseIntWithDefault(
  process.env.MAX_RESULTS_NUMBER,
  100
);

export const EXPRESS_PORT = parseIntWithDefault(process.env.EXPRESS_PORT, 3000);
