import { baseRepo } from "../../lib/baseRepo";
import { Repository } from "../../lib/commonTypes";
import makeUser from "./user";
import { IUser } from "./users.types";

export const makeUserRepo = ({ model }: any): Repository<IUser> => {
  const userBaseRepo = baseRepo(model, makeUser);

  return Object.freeze(userBaseRepo);
};
