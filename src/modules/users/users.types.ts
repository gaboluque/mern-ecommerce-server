export enum UserRole {
  admin = "admin",
  client = "client",
}

export const userRoleList = [UserRole.admin, UserRole.client];

export interface IUserAddress {
  city: string;
  state: string;
  address: string;
  phone: string;
}

export interface IUserAddressDTO {
  city?: string;
  state?: string;
  address?: string;
  phone?: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  address: IUserAddress;
}

export interface IUserDTO {
  _id?: string;
  id?: string | number;
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  address?: IUserAddress;
}
