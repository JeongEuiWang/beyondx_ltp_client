import { AuthUser } from "@/entities/user";

type signInAPIRequest = {
  email: string;
  password: string;
}

type signInAPIResponse = AuthUser

type refreshAPIRequest = void;

type refreshAPIResponse = AuthUser

export type {
  signInAPIRequest,
  signInAPIResponse,
  refreshAPIRequest,
  refreshAPIResponse
}
