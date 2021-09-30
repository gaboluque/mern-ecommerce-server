/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

export type MongoId = mongoose.Types.ObjectId;

export interface LooseObject {
  [key: string]: any;
}
export interface IPaginationObj {
  sort: LooseObject;
  page: number;
  limit: number;
}

export interface IPagination {
  query?: LooseObject;
  pagination?: IPaginationObj;
}

export interface Repository<M> extends LooseObject {
  add: (obj: M) => Promise<any>;
  findByEmail: (obj: M) => Promise<any>;
  findById: (obj: M) => Promise<any>;
  find: (obj: { max: number }) => Promise<any>;
  updateOne: (query: LooseObject, update: LooseObject) => Promise<any>;
}

export interface HttpRequest {
  path: string;
  method: string;
  pathParams: LooseObject;
  queryParams: LooseObject;
  body: LooseObject;
}

export interface HttpResponse {
  statusCode?: number;
  headers?: LooseObject;
  data?: LooseObject | string | number;
}

export type Route = (req: HttpRequest) => Promise<HttpResponse> | HttpResponse;

export interface RouteController {
  [key: string]: Route;
}
