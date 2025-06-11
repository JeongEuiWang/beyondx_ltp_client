import { API, makeQuery, AdminServer, QuoteServer } from "@/features/_core/api";
import {
  getAdminQuotesAPIRequest,
  getAdminQuotesAPIResponse,
  getAdminQuoteDetailAPIRequest,
  getAdminQuoteDetailAPIResponse,
} from "@/features/admin/api/type";

const getAdminQuotesAPI: API<
  getAdminQuotesAPIRequest,
  getAdminQuotesAPIResponse
> = async (request) => {
  try {
    const result = await QuoteServer.get(`admin${makeQuery(request)}`).json();
    return result as getAdminQuotesAPIResponse;
  } catch (e) {
    throw e;
  }
};

const getAdminQuoteDetailAPI: API<
  getAdminQuoteDetailAPIRequest,
  getAdminQuoteDetailAPIResponse
> = async (request) => {
  try { 
    const result = await QuoteServer.get(`admin/${request.quote_id}`).json();
    return result as getAdminQuoteDetailAPIResponse;
  } catch (e) {
    throw e;
  }
};

export { getAdminQuotesAPI, getAdminQuoteDetailAPI };
