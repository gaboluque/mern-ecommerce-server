import SuperError from "./SuperError";

export default class RequiredParameterError extends SuperError {
  constructor(param: string) {
    super(`${param} is required`, 400);
    this.name = "RequiredParameterError";
  }
}

export const requiredParam = (param: string): void => {
  throw new RequiredParameterError(param);
};
