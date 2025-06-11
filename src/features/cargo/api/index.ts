import { CargoServer, API } from "@/features/_core/api";
import {
  getCargoTransportationAPIRequest,
  getCargoTransportationAPIResponse,
  getCargoAccessorialAPIRequest,
  getCargoAccessorialAPIResponse,
  getCargoPackageAPIRequest,
  getCargoPackageAPIResponse,
} from "./type";

const getCargoTransportationAPI: API<getCargoTransportationAPIRequest, getCargoTransportationAPIResponse> = async () => {
  try {
    const result = await CargoServer.get("transportation").json();
    return result as getCargoTransportationAPIResponse;
  } catch (e) {
    throw e;
  }
};

const getCargoAccessorialAPI: API<getCargoAccessorialAPIRequest, getCargoAccessorialAPIResponse> = async () => {
  try {
    const result = await CargoServer.get("accessorial").json();
    return result as getCargoAccessorialAPIResponse;
  } catch (e) {
    throw e;
  }
};

const getCargoPackageAPI: API<getCargoPackageAPIRequest, getCargoPackageAPIResponse> = async () => {
  try {
    const result = await CargoServer.get("package").json();
    return result as getCargoPackageAPIResponse;
  } catch (e) {
    throw e;
  }
};

export {
  getCargoTransportationAPI,
  getCargoAccessorialAPI,
  getCargoPackageAPI,
}; 