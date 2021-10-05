import SuperError from "./SuperError";

export default class InvalidPropertyError extends SuperError {
  constructor(property: string) {
    super(`Invalid ${property}`, 400);
    this.name = "InvalidPropertyError";
  }
}
