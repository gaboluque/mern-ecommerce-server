import { Request, Response } from "express";
import { HttpResponse, Route } from "../../lib/commonTypes";
import { adaptRequest } from "./adaptRequest";

export function makeRoute(route: Route) {
  return async (req: Request, res: Response): Promise<void> => {
    const httpRequest = adaptRequest(req);

    try {
      const { headers, statusCode, data }: HttpResponse = await route(httpRequest);
      res
        .set(
          headers || {
            "Content-Type": "application/json",
          }
        )
        .status(statusCode || 200)
        .send(data);
    } catch {
      res.status(500).end();
    }
  };
}
