import validator from "validator";
import { pick } from "lodash";
import InvalidPropertyError from "../../complements/errors/InvalidPropertyError";
import { IUser, IUserAddress, IUserAddressDTO, IUserDTO, UserRole } from "./users.types";

export const addressValidator = (addressDTO: IUserAddressDTO): IUserAddress => {
  const { city, state, address, phone } = addressDTO;

  if (!city || !validator.isAlpha(city)) throw new InvalidPropertyError("address city");
  if (!state || !validator.isAlpha(state)) throw new InvalidPropertyError("address state");
  if (!address) throw new InvalidPropertyError("address address");
  if (!phone || !validator.isNumeric(phone)) throw new InvalidPropertyError("address phone");

  return addressDTO as IUserAddress;
};

export const userValidator = (userDTO: IUserDTO): IUser => {
  const newUser: IUserDTO = pick(userDTO, ["id", "name", "email", "password", "role", "address"]);

  if (!newUser.id || !validator.isNumeric(`${newUser.id}`)) throw new InvalidPropertyError("id");

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
    !validator.isLength(newUser.password, { min: 2 })
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
