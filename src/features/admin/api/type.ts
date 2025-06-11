import { Quote } from "@/entities/quote";

type getAdminQuotesAPIRequest = {
  status: Array<"ESTIMATE" | "SUBMIT" | "REJECT" | "ACCEPT" | "COMPLETED">;
}

type getAdminQuotesAPIResponse = Quote[];

type getAdminQuoteDetailAPIRequest = {
  quote_id: string;
}

type getAdminQuoteDetailAPIResponse = Quote;

export type {
  getAdminQuotesAPIRequest,
  getAdminQuotesAPIResponse,
  getAdminQuoteDetailAPIRequest,
  getAdminQuoteDetailAPIResponse,
}; 