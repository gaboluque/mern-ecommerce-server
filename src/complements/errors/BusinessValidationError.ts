import SuperError from "./SuperError";

export default class BusinessValidationError extends SuperError {
  constructor(message: string) {
    super(message, 400);
    this.name = "BusinessValidationError";
  }
}
