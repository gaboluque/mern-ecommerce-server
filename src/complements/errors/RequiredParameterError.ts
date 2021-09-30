export default class RequiredParameterError extends Error {
  constructor(param: string) {
    super(`${param} can not be null or undefined.`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequiredParameterError);
    }
  }
}

export const requiredParam = (param: string): void => {
  throw new RequiredParameterError(param);
};
