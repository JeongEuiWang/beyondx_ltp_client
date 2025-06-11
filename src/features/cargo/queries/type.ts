import { CargoPackage } from "@/entities/cargo";
import {
  getCargoTransportationAPIRequest,
  getCargoTransportationAPIResponse,
  getCargoAccessorialAPIRequest,
  getCargoAccessorialAPIResponse,
} from "@/features/cargo/api/type";

type useGetCargoTransportationRequest = getCargoTransportationAPIRequest;

type useGetCargoTransportationResponse = getCargoTransportationAPIResponse;

type useGetCargoAccessorialRequest = getCargoAccessorialAPIRequest;

type useGetCargoAccessorialResponse = getCargoAccessorialAPIResponse;

type useGetCargoPackageRequest = void;

type useGetCargoPackageResponse = CargoPackage[];

export type {
  useGetCargoTransportationRequest,
  useGetCargoTransportationResponse,
  useGetCargoAccessorialRequest,
  useGetCargoAccessorialResponse,
  useGetCargoPackageRequest,
  useGetCargoPackageResponse,
};
