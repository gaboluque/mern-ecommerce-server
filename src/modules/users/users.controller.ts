import { HttpRequest, HttpResponse, Repository, RouteController } from "../../lib/commonTypes";
import { IUser } from "./users.types";

export const makeUsersController = (repo: Repository<IUser>): RouteController => {
  const getUsers = async (httpRequest: HttpRequest): Promise<HttpResponse> => {
    const { id } = httpRequest.pathParams || {};
    const { max, before, after } = httpRequest.queryParams || {};

    const result = id ? await repo.findById(id) : await repo.getItems({ max, before, after });
    return {
      data: result,
    };
  };

  return {
    getUsers,
  };
};
