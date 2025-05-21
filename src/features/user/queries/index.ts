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
} from "./type";
import {
  checkEmailAPI,
  createUserAddressAPI,
  getUserAPI,
  getUserAddressesAPI,
  signUpAPI,
} from "@/features/user/api";

// 질문 1: mutation에 대한 성공 및 실패 이후의 처리는 어디서 결정하는 것이 좋을까?
// Featrure vs View
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

export {
  useSignUp,
  useCheckEmail,
  useGetUser,
  useCreateUserAddress,
  useGetUserAddresses,
};
