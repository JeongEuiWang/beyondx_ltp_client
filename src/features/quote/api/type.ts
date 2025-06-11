import { Quote, CreateQuoteRequest, UpdateQuoteRequest } from "@/entities/quote";

type createQuoteAPIRequest = CreateQuoteRequest;

type createQuoteAPIResponse = Quote;

type getQuotesAPIRequest = void;

type getQuotesAPIResponse = Quote[];

type getQuoteAPIRequest = {
  quote_id: string;
};

type getQuoteAPIResponse = Quote;

type updateQuoteAPIRequest = UpdateQuoteRequest & {
  quote_id: string;
};

type updateQuoteAPIResponse = Quote;

type deleteQuoteAPIRequest = {
  quote_id: string;
};

type deleteQuoteAPIResponse = {
  success: boolean;
};

type submitQuoteAPIRequest = {
  quote_id: string;
};

type submitQuoteAPIResponse = Quote;

type confirmQuoteAPIRequest = {
  quote_id: string;
  actual_price: number;
};

type confirmQuoteAPIResponse = Quote;

export type {
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
}; 