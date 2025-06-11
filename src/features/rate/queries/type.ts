import { RateLocation } from "@/entities/rate";

type useGetRateLocationRequest = {
  city?: string;
  zip_code?: string;
};

type useGetRateLocationResponse = RateLocation[];

export type {
  useGetRateLocationRequest,
  useGetRateLocationResponse,
}; 