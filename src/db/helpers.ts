import { LooseObject } from "../lib/commonTypes";

type FieldsArr = string[];
type FieldsObj = LooseObject;
type FieldsStr = string;

type QueryFields = FieldsArr | FieldsObj | FieldsStr;

// Define how you want to pass fields projection to db queries
export const normalizeFields = (fields: QueryFields): string => {
  let normalized;
  if (typeof fields === "string") {
    normalized = fields.replace(/,/g, "");
    normalized = normalized.split(" ");
  } else if (Array.isArray(fields)) {
    normalized = [...fields];
  } else {
    normalized = Object.entries(fields).map(([key, val]) => (val ? key : `-${key}`));
  }

  return normalized.join(" ");
};
