import { HttpRequest, Repository, RouteController } from "../../lib/commonTypes";
import { IUser } from "./users.types";

export const makeUsersController = (repo: Repository<IUser>): RouteController => {
  const indexUsers = async () => {
    const result = await repo.find();
    return {
      data: result,
    };
  };

  const createUser = async (httpRequest: HttpRequest) => {
    console.log(httpRequest);

    const newUser = await repo.create(httpRequest.body as IUser);

    console.log(newUser);

    return { data: newUser };
  };

  return {
    indexUsers,
    createUser,
  };
};
