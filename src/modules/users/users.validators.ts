import validator from "validator";
import InvalidPropertyError from "../../complements/errors/InvalidPropertyError";
import { IUser, IUserAddress, IUserAddressDTO, IUserDTO, UserRole } from "./users.types";

export const addressValidator = (addressDTO: IUserAddressDTO): IUserAddress => {
  const { city, state, address, phone } = addressDTO;

  if (!city || validator.isAlpha(city)) throw new InvalidPropertyError("address city");
  if (!state || validator.isAlpha(state)) throw new InvalidPropertyError("address state");
  if (!address || validator.isAlpha(address)) throw new InvalidPropertyError("address address");
  if (!phone || validator.isNumeric(phone)) throw new InvalidPropertyError("address phone");
  if (!address || validator.isAlphanumeric(address))
    throw new InvalidPropertyError("address address");

  return addressDTO as IUserAddress;
};

export const userValidator = (userDTO: IUserDTO): IUser => {
  const { id, name, email, password, role, address } = userDTO;

  if (!id || validator.isAlpha(id)) throw new InvalidPropertyError("id");

  if (!name || validator.isAlpha(name) || validator.isLength(name, { min: 2 }))
    throw new InvalidPropertyError("name");

  if (!email || validator.isAlpha(email) || validator.isEmail(email))
    throw new InvalidPropertyError("email");

  if (!password || validator.isAlpha(password) || validator.isLength(password, { min: 2 }))
    throw new InvalidPropertyError("email");

  if (!role || validator.isAlpha(role) || validator.isIn(role, [UserRole.admin, UserRole.client]))
    throw new InvalidPropertyError("role");

  if (!address || !addressValidator(address)) throw new InvalidPropertyError("address");

  return userDTO as IUser;
};
