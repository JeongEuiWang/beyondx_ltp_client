import { QuoteServer, API } from "@/features/_core/api";
import {
  createQuoteAPIRequest,
  createQuoteAPIResponse,
  getQuotesAPIRequest,
  getQuotesAPIResponse,
  getQuoteAPIRequest,
  getQuoteAPIResponse,
  updateQuoteAPIRequest,
  updateQuoteAPIResponse,
  deleteQuoteAPIRequest,
  deleteQuoteAPIResponse,
  submitQuoteAPIRequest,
  submitQuoteAPIResponse,
  confirmQuoteAPIRequest,
  confirmQuoteAPIResponse,
} from "@/features/quote/api/type";

const createQuoteAPI: API<
  createQuoteAPIRequest,
  createQuoteAPIResponse
> = async (request) => {
  try {
    const result = await QuoteServer.post("", {
      json: { ...request },
    }).json();
    return result as createQuoteAPIResponse;
  } catch (e) {
    throw e;
  }
};

const getQuotesAPI: API<
  getQuotesAPIRequest,
  getQuotesAPIResponse
> = async () => {
  try {
    const result = await QuoteServer.get("").json();
    return result as getQuotesAPIResponse;
  } catch (e) {
    throw e;
  }
};

const getQuoteAPI: API<getQuoteAPIRequest, getQuoteAPIResponse> = async (
  request
) => {
  try {
    const result = await QuoteServer.get(request.quote_id).json();
    return result as getQuoteAPIResponse;
  } catch (e) {
    throw e;
  }
};

const updateQuoteAPI: API<
  updateQuoteAPIRequest,
  updateQuoteAPIResponse
> = async (request) => {
  const { quote_id, ...updateData } = request;
  try {
    const result = await QuoteServer.put(quote_id, {
      json: { ...updateData },
    }).json();
    return result as updateQuoteAPIResponse;
  } catch (e) {
    throw e;
  }
};

const deleteQuoteAPI: API<
  deleteQuoteAPIRequest,
  deleteQuoteAPIResponse
> = async (request) => {
  try {
    const result = await QuoteServer.delete(request.quote_id).json();
    return result as deleteQuoteAPIResponse;
  } catch (e) {
    throw e;
  }
};

const submitQuoteAPI: API<
  submitQuoteAPIRequest,
  submitQuoteAPIResponse
> = async (request) => {
  try {
    const result = await QuoteServer.post(`${request.quote_id}/submit`).json();
    return result as submitQuoteAPIResponse;
  } catch (e) {
    throw e;
  }
};

const confirmQuoteAPI: API<
  confirmQuoteAPIRequest,
  confirmQuoteAPIResponse
> = async (request) => {
  try {
    const result = await QuoteServer.post(`${request.quote_id}/confirm`, {
      json: {
        actual_price: request.actual_price,
      },
    }).json();
    return result as confirmQuoteAPIResponse;
  } catch (e) {
    throw e;
  }
};

export {
  createQuoteAPI,
  getQuotesAPI,
  getQuoteAPI,
  updateQuoteAPI,
  deleteQuoteAPI,
  submitQuoteAPI,
  confirmQuoteAPI,
};
