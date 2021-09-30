export default class InvalidPropertyError extends Error {
  constructor(property: string) {
    super(`Invalid ${property}`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidPropertyError);
    }
  }
}
