import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Mutation, SuspenseQuery } from "@/features/_core/api";
import {
  createQuoteAPI,
  getQuotesAPI,
  getQuoteAPI,
  updateQuoteAPI,
  deleteQuoteAPI,
  submitQuoteAPI,
  confirmQuoteAPI,
} from "@/features/quote/api";
import {
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
} from "@/features/quote/queries/type";

const useGetQuotes: SuspenseQuery<
  useGetQuotesRequest,
  useGetQuotesResponse
> = () => {
  return useSuspenseQuery({
    queryKey: ["quotes"],
    queryFn: async () => {
      const result = await getQuotesAPI();
      return result;
    },
  });
};

const useGetQuote: SuspenseQuery<useGetQuoteRequest, useGetQuoteResponse> = (
  args
) => {
  return useSuspenseQuery({
    queryKey: ["quote", args.quote_id],
    queryFn: async () => {
      const result = await getQuoteAPI({
        quote_id: args.quote_id,
      });
      return result;
    },
  });
};

const useCreateQuote: Mutation<
  useCreateQuoteRequest,
  useCreateQuoteResponse
> = (args) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = args;

  return useMutation({
    mutationFn: async (data) => {
      const result = await createQuoteAPI(data);
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};

const useUpdateQuote: Mutation<
  useUpdateQuoteRequest,
  useUpdateQuoteResponse
> = (args) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = args;

  return useMutation({
    mutationFn: async (data) => {
      const result = await updateQuoteAPI(data);
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      queryClient.invalidateQueries({ queryKey: ["quote", data.id] });
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};

const useDeleteQuote: Mutation<
  useDeleteQuoteRequest,
  useDeleteQuoteResponse
> = (args) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = args;

  return useMutation({
    mutationFn: async (data) => {
      const result = await deleteQuoteAPI(data);
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};

const useSubmitQuote: Mutation<
  useSubmitQuoteRequest,
  useSubmitQuoteResponse
> = (args) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = args;

  return useMutation({
    mutationFn: async (data) => {
      const result = await submitQuoteAPI(data);
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      queryClient.invalidateQueries({ queryKey: ["quote", data.id] });
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};

const useConfirmQuote: Mutation<
  useConfirmQuoteRequest,
  useConfirmQuoteResponse
> = (args) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = args;

  return useMutation({
    mutationFn: async (data) => {
      const result = await confirmQuoteAPI(data);
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      queryClient.invalidateQueries({ queryKey: ["quote", data.id] });
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};

  

export {
  useGetQuotes,
  useGetQuote,
  useCreateQuote,
  useUpdateQuote,
  useDeleteQuote,
  useSubmitQuote,
  useConfirmQuote
};
