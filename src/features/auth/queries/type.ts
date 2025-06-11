import { AuthUser } from "@/entities/user";

type useRefreshRequest = void;

type useRefreshResponse = AuthUser;

type useSignInRequest = {
  email: string;
  password: string;
};

type useSignInResponse = AuthUser;

type useSignOutRequest = void;

type useSignOutResponse = void;

export type {
  useRefreshRequest,
  useRefreshResponse,
  useSignInRequest,
  useSignInResponse,
  useSignOutRequest,
  useSignOutResponse,
};
