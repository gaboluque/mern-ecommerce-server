import { Request } from "express";
import { HttpRequest } from "../../lib/commonTypes";

export const adaptRequest = (req: Request): HttpRequest => {
  return Object.freeze({
    path: req.originalUrl,
    method: req.method,
    pathParams: req.params,
    queryParams: req.query,
    body: req.body,
  });
};
