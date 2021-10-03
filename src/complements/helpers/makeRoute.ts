import { NextFunction, Request, Response } from "express";
import { HttpResponse, Route } from "../../lib/commonTypes";
import { adaptRequest } from "./adaptRequest";

export function makeRoute(route: Route) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const httpRequest = adaptRequest(req);

    const defaultHeaders = {
      "Content-Type": "application/json",
    };

    try {
      const { headers, statusCode, data }: HttpResponse = await route(httpRequest);
      res
        .set({ ...defaultHeaders, ...headers })
        .status(statusCode || 200)
        .send(data);
    } catch (e: any) {
      next(e);
    }
  };
}
