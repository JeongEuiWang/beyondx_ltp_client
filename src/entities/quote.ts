import { LocationType } from "./user_address";
import { Cargo } from "./cargo";

type QuoteLocation = {
  id?: string;
  state: string;
  county: string;
  city: string;
  zip_code: string;
  address: string;
  location_type: LocationType;
  request_datetime: string;
  accessorials: Array<{
    cargo_accessorial_id: number;
    name: string;
  }>;
};

type Quote = {
  id?: string;
  cargo_transportation_id: number;
  is_priority: boolean;
  from_location: QuoteLocation;
  to_location: QuoteLocation;
  cargo: Cargo[];
  order_status: "ESTIMATE" | "SUBMIT" | "REJECT" | "ACCEPT" | "COMPLETED";
  created_at?: string;
  updated_at?: string;
  base_price: number;
  extra_price: number;
  total_price: number;
  total_weight: number;
};

type CreateQuoteRequest = Omit<
  Quote,
  | "id"
  | "created_at"
  | "updated_at"
  | "order_status"
  | "base_price"
  | "extra_price"
  | "total_price"
  | "total_weight"
>;
type UpdateQuoteRequest = Omit<
  Quote,
  | "id"
  | "created_at"
  | "updated_at"
  | "order_status"
  | "base_price"
  | "extra_price"
  | "total_price"
  | "total_weight"
>;

export type { Quote, QuoteLocation, CreateQuoteRequest, UpdateQuoteRequest };
