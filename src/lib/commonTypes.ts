/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

export type MongoId = mongoose.Types.ObjectId;

export interface LooseObject {
  [key: string]: any;
}
export interface IPaginationObj {
  sort?: LooseObject;
  page?: number;
  limit?: number;
}

export interface IPagination {
  query?: LooseObject;
  pagination?: IPaginationObj;
}

export type ObjPromiseFunc<T> = (obj: T) => Promise<any>;

export interface Repository<M> {
  find: (query?: LooseObject, fields?: string | LooseObject) => Promise<M[]>;
  findOne: (query?: LooseObject, fields?: string | LooseObject) => Promise<M>;
  create: ObjPromiseFunc<M>;
  findById: ObjPromiseFunc<M>;
  update: (query: LooseObject, update: LooseObject) => Promise<M>;
  updateById: (id: string, update: LooseObject) => Promise<M>;
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
