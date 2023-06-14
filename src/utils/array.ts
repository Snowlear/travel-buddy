export const isObjectOfArraysOfStrings = (obj: any) => {
  for (const value of Object.values(obj)) {
    if (
      !Array.isArray(value) ||
      !value.every((item) => typeof item === "string")
    ) {
      return false;     
    }
  }
  return true;
};
