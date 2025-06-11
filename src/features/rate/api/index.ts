import { RateServer, API, makeQuery } from "@/features/_core/api";
import {
  getRateLocationAPIRequest,
  getRateLocationAPIResponse,
} from "@/features/rate/api/type";

const getRateLocationAPI: API<getRateLocationAPIRequest, getRateLocationAPIResponse> = async (request) => {
  try {
    const result = await RateServer.get(
      `location${makeQuery(request)}`
    ).json();
    return result as getRateLocationAPIResponse;
  } catch (e) {
    throw e;
  }
};

export {
  getRateLocationAPI,
}; 