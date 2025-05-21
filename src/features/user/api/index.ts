import { UserServer, API, makeQuery } from "@/features/_core/api";
import {
  checkEmailAPIRequest,
  checkEmailAPIResponse,
  createUserAddressAPIRequest,
  createUserAddressAPIResponse,
  getUserAddressesAPIRequest,
  getUserAddressesAPIResponse,
  getUserAPIRequest,
  getUserAPIResponse,
  signUpAPIRequest,
  signUpAPIResponse,
} from "./type";

const signUpAPI: API<signUpAPIRequest, signUpAPIResponse> = async (request) => {
  try {
    const result = await UserServer.post("", {
      json: { ...request },
    }).json();
    return result as signUpAPIResponse;
  } catch (e) {
    throw e;
  }
};

const checkEmailAPI: API<checkEmailAPIRequest, checkEmailAPIResponse> = async (
  request
) => {
  try {
    const result = await UserServer.get(
      `check-email${makeQuery(request)}`
    ).json();
    return result as checkEmailAPIResponse;
  } catch (e) {
    throw e;
  }
};

const getUserAPI: API<getUserAPIRequest, getUserAPIResponse> = async () => {
  try {
    const result = await UserServer.get("me").json();
    return result as getUserAPIResponse;
  } catch (e) {
    throw e;
  }
};
const createUserAddressAPI: API<
  createUserAddressAPIRequest,
  createUserAddressAPIResponse
> = async (request) => {
  try {
    const result = await UserServer.post("address", {
      json: { ...request },
    }).json();
    return result as createUserAddressAPIResponse;
  } catch (e) {
    throw e;
  }
};

const getUserAddressesAPI: API<
  getUserAddressesAPIRequest,
  getUserAddressesAPIResponse
> = async () => {
  try {
    const result = await UserServer.get("address").json();
    return result as getUserAddressesAPIResponse;
  } catch (e) {
    throw e;
  }
};

export {
  signUpAPI,
  checkEmailAPI,
  createUserAddressAPI,
  getUserAddressesAPI,
  getUserAPI,
};
