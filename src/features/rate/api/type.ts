import { RateLocation } from "@/entities/rate";

type getRateLocationAPIRequest = {
  region_id: number;
  city?: string;
  zip_code?: string;
};

type getRateLocationAPIResponse = RateLocation[];

export type {
  getRateLocationAPIRequest,
  getRateLocationAPIResponse,
}; 