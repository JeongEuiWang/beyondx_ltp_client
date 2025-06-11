import { useQuery } from "@tanstack/react-query";
import { Query } from "@/features/_core/api";
import { getRateLocationAPI } from "@/features/rate/api";
import {
  useGetRateLocationRequest,
  useGetRateLocationResponse,
} from "@/features/rate/queries/type";

const useGetRateLocation: Query<useGetRateLocationRequest, useGetRateLocationResponse> = (args) => {
  return useQuery({
    queryKey: ["rate", "location", args.city, args.zip_code],
    queryFn: async () => {
      const result = await getRateLocationAPI({
        region_id: 1,
        ...(args.city && { city: args.city }),
        ...(args.zip_code && { zip_code: args.zip_code }),
      });
      return result;
    },
    enabled: !!args.city || !!args.zip_code,
  });
};

export { useGetRateLocation }; 