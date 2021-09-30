import { userNormalizer } from "./users.normalizers";
import { IUser, IUserDTO } from "./users.types";
import { userValidator } from "./users.validators";

export default function makeUser(userData: IUserDTO): IUser {
  const validUser = userValidator(userData);
  const normalUser = userNormalizer(validUser);
  return Object.freeze(normalUser);
}
