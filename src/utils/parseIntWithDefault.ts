export const parseIntWithDefault = (
  test: string | undefined,
  defaultValue: number
) => {
  let limit = defaultValue;
  if (test && typeof test === "string") {
    limit = parseInt(test, 10);
    if (isNaN(limit)) {
      limit = defaultValue;
    }
  }
  return limit;
};
