import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Mutation, SuspenseQuery } from "@/features/_core/api";
import {
  useCheckEmailRequest,
  useCheckEmailResponse,
  useCreateUserAddressRequest,
  useCreateUserAddressResponse,
  useGetUserAddressesRequest,
  useGetUserAddressesResponse,
  useGetUserRequest,
  useGetUserResponse,
  useSignUpRequest,
  useSignUpResponse,
  useUpdateUserAddressRequest,
  useUpdateUserAddressResponse,
  useDeleteUserAddressRequest,
  useDeleteUserAddressResponse,
} from "./type";
import {
  checkEmailAPI,
  createUserAddressAPI,
  getUserAPI,
  getUserAddressesAPI,
  signUpAPI,
  updateUserAddressAPI,
  deleteUserAddressAPI,
} from "@/features/user/api";
import { queryClient } from "@/app/App";

const useSignUp: Mutation<useSignUpRequest, useSignUpResponse> = (args) => {
  const { onSuccess, onError } = args;
  return useMutation({
    mutationFn: async (data) => {
      const result = await signUpAPI(data);
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

const useCheckEmail: SuspenseQuery<
  useCheckEmailRequest,
  useCheckEmailResponse
> = (args) => {
  return useSuspenseQuery({
    queryKey: ["checkEmail"],
    queryFn: async () => {
      const result = await checkEmailAPI(args);
      return result;
    },
  });
};

const useGetUser: SuspenseQuery<useGetUserRequest, useGetUserResponse> = () => {
  return useSuspenseQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      const result = await getUserAPI();
      return result;
    },
  });
};

const useCreateUserAddress: Mutation<
  useCreateUserAddressRequest,
  useCreateUserAddressResponse
> = (args) => {
  const { onSuccess, onError } = args;
  return useMutation({
    mutationFn: async (data) => {
      const result = await createUserAddressAPI(data);
      queryClient.invalidateQueries({ queryKey: ["getUserAddresses"] });
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

const useGetUserAddresses: SuspenseQuery<
  useGetUserAddressesRequest,
  useGetUserAddressesResponse
> = () => {
  return useSuspenseQuery({
    queryKey: ["getUserAddresses"],
    queryFn: async () => {
      const result = await getUserAddressesAPI();
      return result;
    },
  });
};

const useUpdateUserAddress: Mutation<
  useUpdateUserAddressRequest,
  useUpdateUserAddressResponse
> = (args) => {
  const { onSuccess, onError } = args;
  return useMutation({
    mutationFn: async (data) => {
      const result = await updateUserAddressAPI(data);
      queryClient.invalidateQueries({ queryKey: ["getUserAddresses"] });
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

const useDeleteUserAddress: Mutation<
  useDeleteUserAddressRequest,
  useDeleteUserAddressResponse
> = (args) => {
  const { onSuccess, onError } = args;
  return useMutation({
    mutationFn: async (data) => {
      const result = await deleteUserAddressAPI(data);
      queryClient.invalidateQueries({ queryKey: ["getUserAddresses"] });
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};



export {
  useSignUp,
  useCheckEmail,
  useGetUser,
  useCreateUserAddress,
  useGetUserAddresses,
  useUpdateUserAddress,
  useDeleteUserAddress,
};
