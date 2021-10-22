import SuperError from "./SuperError";

export default class NotFoundError extends SuperError {
  constructor(message: string) {
    super(message, 404);
    this.name = "NotFoundError";
  }
}
