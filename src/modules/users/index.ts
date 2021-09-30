import { makeUsersController } from "./users.controller";
import { UserModel } from "./users.model";
import { makeUserRepo } from "./users.repo";

const usersRepo = makeUserRepo({ model: UserModel });
export const usersController = makeUsersController(usersRepo);
