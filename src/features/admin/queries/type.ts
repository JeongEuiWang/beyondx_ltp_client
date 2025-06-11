import { Quote } from "@/entities/quote";

type useGetAdminQuotesRequest = {
  status: Array<"ESTIMATE" | "SUBMIT" | "REJECT" | "ACCEPT" | "COMPLETED">;
};

type useGetAdminQuotesResponse = Quote[];

type useGetAdminQuoteDetailRequest = {
  quote_id: string;
};

type useGetAdminQuoteDetailResponse = Quote;

export type {
  useGetAdminQuotesRequest,
  useGetAdminQuotesResponse,
  useGetAdminQuoteDetailRequest,
  useGetAdminQuoteDetailResponse,
}; 