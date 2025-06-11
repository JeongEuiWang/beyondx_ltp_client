import { UserWithLevel } from "@/entities/user";
import { UserAddress, UserAddressWithId } from "@/entities/user_address";

type signUpAPIRequest = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
};

type signUpAPIResponse = {
  success: boolean;
};

type checkEmailAPIRequest = {
  email: string;
};

type checkEmailAPIResponse = {
  is_unique: boolean;
};

type getUserAPIRequest = void;

type getUserAPIResponse = UserWithLevel;

type createUserAddressAPIRequest = UserAddress;

type createUserAddressAPIResponse = UserAddressWithId;

type getUserAddressesAPIRequest = void;

type getUserAddressesAPIResponse = UserAddressWithId[];

type updateUserAddressAPIRequest = UserAddressWithId;

type updateUserAddressAPIResponse = UserAddressWithId;

type deleteUserAddressAPIRequest = {
  id: number;
};

type deleteUserAddressAPIResponse = void;



export type {
  signUpAPIRequest,
  signUpAPIResponse,
  checkEmailAPIRequest,
  checkEmailAPIResponse,
  createUserAddressAPIRequest,
  createUserAddressAPIResponse,
  getUserAddressesAPIRequest,
  getUserAddressesAPIResponse,
  getUserAPIRequest,
  getUserAPIResponse,
  updateUserAddressAPIRequest,
  updateUserAddressAPIResponse,
  deleteUserAddressAPIRequest,
  deleteUserAddressAPIResponse,
};
