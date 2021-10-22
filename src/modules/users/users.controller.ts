import { HttpRequest, Repository, RouteController } from "../../lib/commonTypes";
import { userCreator } from "./services/userCreator";
import { userUpdater } from "./services/userUpdater";
import { IUser, IUserDTO } from "./users.types";

export const makeUsersController = (repo: Repository<IUser>): RouteController => {
  const indexUsers = async () => {
    const usersList = await repo.find();
    return { data: usersList };
  };

  const createUser = async (httpRequest: HttpRequest) => {
    const newUser = await userCreator(repo)(httpRequest.body as IUserDTO);
    return { data: newUser, statusCode: 201 };
  };

  const updateUser = async (httpRequest: HttpRequest) => {
    const updatedUser = await userUpdater(repo)(
      httpRequest.queryParams.id,
      httpRequest.body as IUserDTO
    );
    return { data: updatedUser, statusCode: 201 };
  };

  return {
    indexUsers,
    createUser,
    updateUser,
  };
};
