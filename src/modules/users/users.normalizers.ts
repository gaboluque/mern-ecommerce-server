import { startCase } from "lodash";
import { IUser } from "./users.types";

export const userNormalizer = (user: IUser): IUser => {
  return {
    ...user,
    email: user.email.toLowerCase(),
    name: startCase(user.name),
  };
};
