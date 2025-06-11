import { API, AuthServer } from "@/features/_core/api";

import {
  signInAPIRequest,
  signInAPIResponse,
  refreshAPIRequest,
  refreshAPIResponse,
  signOutAPIRequest,
  signOutAPIResponse,
} from "./type";

const signInAPI: API<signInAPIRequest, signInAPIResponse> = async (request) => {
  const { email, password } = request;

  try {
    const result = await AuthServer.post("login", {
      json: {
        email,
        password,
      },
      credentials: "include",
    }).json();
    return result as signInAPIResponse;
  } catch (e) {
    throw e;
  }
};

const refreshAPI: API<refreshAPIRequest, refreshAPIResponse> = async () => {
  try {
    const result = await AuthServer.post("refresh", {
      credentials: "include",
    }).json();
    return result as refreshAPIResponse;
  } catch (e) {
    throw e;
  }
};

const signOutAPI: API<signOutAPIRequest, signOutAPIResponse> = async () => {
  try {
    const result = await AuthServer.post("logout", {
      credentials: "include",
    }).json();
    return result as signOutAPIResponse;
  } catch (e) {
    throw e;
  }
};

export { signInAPI, refreshAPI, signOutAPI };
