import { useQuery } from "@tanstack/react-query";
import { Query } from "@/features/_core/api";
import {
  getAdminQuotesAPI,
  getAdminQuoteDetailAPI,
} from "@/features/admin/api";
import {
  useGetAdminQuotesRequest,
  useGetAdminQuotesResponse,
  useGetAdminQuoteDetailRequest,
  useGetAdminQuoteDetailResponse,
} from "@/features/admin/queries/type";

const useGetAdminQuotes: Query<
  useGetAdminQuotesRequest,
  useGetAdminQuotesResponse
> = (args) => {
  return useQuery({
    queryKey: ["admin", "quotes", args.status],
    queryFn: async () => {
      const result = await getAdminQuotesAPI({ status: args.status });
      return result;
    },
  });
};

const useGetAdminQuoteDetail: Query<
  useGetAdminQuoteDetailRequest,
  useGetAdminQuoteDetailResponse
> = (args) => {
  return useQuery({
    queryKey: ["admin", "quote", args.quote_id],
    queryFn: async () => {
      const result = await getAdminQuoteDetailAPI({ quote_id: args.quote_id });
      return result;
    },
  });
};

export { useGetAdminQuotes, useGetAdminQuoteDetail };
