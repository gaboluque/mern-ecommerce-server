import NotFoundError from "../../../complements/errors/NotFoundError";
import { Repository } from "../../../lib/commonTypes";
import makeUser from "../user";
import { IUser, IUserDTO } from "../users.types";

type UserUpdater = (id: string, dto: IUserDTO) => Promise<IUser>;

export function userUpdater(repo: Repository<IUser>): UserUpdater {
  const validateBusinessRules = async (userDTO: IUserDTO): Promise<IUser> => {
    const foundUser = await repo.findOne({ email: userDTO.email });

    if (!foundUser) throw new NotFoundError("User not found");

    // We dont filter password as this record will go to the DB
    const newUser = makeUser({ ...foundUser, ...userDTO }, false);

    return newUser;
  };

  return async (userId: string, userDTO: IUserDTO): Promise<IUser> => {
    const validUser = await validateBusinessRules(userDTO);
    const updatedUser = await repo.updateById(userId, validUser);

    return updatedUser;
  };
}
