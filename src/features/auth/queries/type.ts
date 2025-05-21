import { AuthUser } from "@/entities/user";

type useRefreshRequest = void;

type useRefreshResponse = AuthUser

type useSignInRequest = {
  email: string;
  password: string;
}

type useSignInResponse = AuthUser

export type {
  useRefreshRequest,
  useRefreshResponse,
  useSignInRequest,
  useSignInResponse
}
