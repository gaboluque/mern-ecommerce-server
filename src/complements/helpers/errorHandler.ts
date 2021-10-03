import { NextFunction, Request, Response } from "express";
import { logEvent, LOG_EVENTS } from "../subscribers/logSubscriber";

export const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let result;
  switch (error.name) {
    case "ValidationError":
      result = Object.entries(error.errors).map(([path, err]: [string, any]) => {
        return `${err.kind} ${path}`;
      });
      break;
    default:
      result = error.message;
      break;
  }

  logEvent.emit(LOG_EVENTS.ERROR, error);

  res.send(result);
};
