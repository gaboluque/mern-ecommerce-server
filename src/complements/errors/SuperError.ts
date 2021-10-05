export const SUPER_ERROR = "SuperError";
class SuperError extends Error {
  statusCode: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = SUPER_ERROR;
    this.statusCode = code;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SuperError);
    }
  }
}

export default SuperError;
