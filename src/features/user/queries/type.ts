import { AuthUser } from "@/entities/user";
import { UserAddress, UserAddressWithId } from "@/entities/user_address";

type useSignUpRequest = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
};

type useSignUpResponse = AuthUser;

type useCheckEmailRequest = {
  email: string;
};

type useCheckEmailResponse = {
  is_unique: boolean;
};

type useGetUserRequest = void;

type useGetUserResponse = AuthUser;

type useCreateUserAddressRequest = UserAddress;

type useCreateUserAddressResponse = UserAddressWithId;

type useGetUserAddressesRequest = void;

type useGetUserAddressesResponse = UserAddressWithId[];

type useUpdateUserAddressRequest = UserAddressWithId;

type useUpdateUserAddressResponse = UserAddressWithId;

type useDeleteUserAddressRequest = {
  id: number;
};

type useDeleteUserAddressResponse = void;



export type {
  useSignUpRequest,
  useSignUpResponse,
  useCheckEmailRequest,
  useCheckEmailResponse,
  useGetUserRequest,
  useGetUserResponse,
  useCreateUserAddressRequest,
  useCreateUserAddressResponse,
  useGetUserAddressesRequest,
  useGetUserAddressesResponse,
  useUpdateUserAddressRequest,
  useUpdateUserAddressResponse,
  useDeleteUserAddressRequest,
  useDeleteUserAddressResponse,
};
