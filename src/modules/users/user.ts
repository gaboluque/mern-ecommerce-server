import { pick, startCase } from "lodash";
import validator from "validator";
import InvalidPropertyError from "../../complements/errors/InvalidPropertyError";
import { IUser, IUserAddress, IUserAddressDTO, IUserDTO, UserRole } from "./users.types";

const userNormalizer = (user: IUser, filterPass = true): IUser => {
  return {
    ...user,
    email: user.email.toLowerCase(),
    name: startCase(user.name),
    password: filterPass ? undefined : user.password,
  };
};

export const addressValidator = (addressDTO: IUserAddressDTO): IUserAddress => {
  const { city, state, address, phone } = addressDTO;

  if (!city || !validator.isAlpha(city)) throw new InvalidPropertyError("address city");
  if (!state || !validator.isAlpha(state)) throw new InvalidPropertyError("address state");
  if (!address) throw new InvalidPropertyError("address address");
  if (!phone || !validator.isNumeric(phone)) throw new InvalidPropertyError("address phone");

  return addressDTO as IUserAddress;
};

const userValidator = (userDTO: IUserDTO): IUser => {
  const newUser: IUserDTO = pick(userDTO, ["id", "name", "email", "password", "role", "address"]);

  if (
    !newUser.name ||
    !validator.isAlpha(newUser.name) ||
    !validator.isLength(newUser.name, { min: 2 })
  )
    throw new InvalidPropertyError("name");

  if (!newUser.email || !validator.isEmail(newUser.email, {}))
    throw new InvalidPropertyError("email");

  if (
    !newUser.password ||
    !validator.isAlphanumeric(newUser.password) ||
    !validator.isLength(newUser.password, { min: 6 })
  )
    throw new InvalidPropertyError("password");

  if (
    !newUser.role ||
    !validator.isAlpha(newUser.role) ||
    !validator.isIn(newUser.role, [UserRole.admin, UserRole.client])
  )
    throw new InvalidPropertyError("role");

  if (!newUser.address || !addressValidator(newUser.address))
    throw new InvalidPropertyError("address");

  return newUser as IUser;
};

export default function makeUser(userData: IUserDTO, filterPassword = true): IUser {
  const validUser = userValidator(userData);
  const normalUser = userNormalizer(validUser, filterPassword);
  return Object.freeze(normalUser);
}
