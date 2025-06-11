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

type useCreateQuoteRequest = createQuoteAPIRequest;

type useCreateQuoteResponse = createQuoteAPIResponse;

type useGetQuotesRequest = getQuotesAPIRequest;

type useGetQuotesResponse = getQuotesAPIResponse;

type useGetQuoteRequest = getQuoteAPIRequest;

type useGetQuoteResponse = getQuoteAPIResponse;

type useUpdateQuoteRequest = updateQuoteAPIRequest;

type useUpdateQuoteResponse = updateQuoteAPIResponse;

type useDeleteQuoteRequest = deleteQuoteAPIRequest;

type useDeleteQuoteResponse = deleteQuoteAPIResponse;

type useSubmitQuoteRequest = submitQuoteAPIRequest;

type useSubmitQuoteResponse = submitQuoteAPIResponse;

type useConfirmQuoteRequest = confirmQuoteAPIRequest;

type useConfirmQuoteResponse = confirmQuoteAPIResponse;

export type {
  useCreateQuoteRequest,
  useCreateQuoteResponse,
  useGetQuotesRequest,
  useGetQuotesResponse,
  useGetQuoteRequest,
  useGetQuoteResponse,
  useUpdateQuoteRequest,
  useUpdateQuoteResponse,
  useDeleteQuoteRequest,
  useDeleteQuoteResponse,
  useSubmitQuoteRequest,
  useSubmitQuoteResponse,
  useConfirmQuoteRequest,
  useConfirmQuoteResponse,
};