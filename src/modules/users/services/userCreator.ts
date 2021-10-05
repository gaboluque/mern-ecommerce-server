import BusinessValidationError from "../../../complements/errors/BusinessValidationError";
import { Repository } from "../../../lib/commonTypes";
import makeUser from "../user";
import { IUser, IUserDTO } from "../users.types";

type UserCreator = (dto: IUserDTO) => Promise<IUser>;

export function userCreator(repo: Repository<IUser>): UserCreator {
  const validateBusinessRules = async (userDTO: IUserDTO): Promise<IUser> => {
    const foundUser = await repo.findOne({ email: userDTO.email });

    if (foundUser) throw new BusinessValidationError("Email already registered");

    // We dont filter password as this record will go to the DB
    const newUser = makeUser(userDTO, false);

    return newUser;
  };

  return async (userDTO: IUserDTO): Promise<IUser> => {
    const validUser = await validateBusinessRules(userDTO);
    const newUser = await repo.create(validUser);

    return newUser;
  };
}
