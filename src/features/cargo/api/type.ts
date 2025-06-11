import { CargoTransportation, CargoAccessorial, CargoPackage } from "@/entities/cargo";

type getCargoTransportationAPIRequest = void;

type getCargoTransportationAPIResponse = CargoTransportation[];

type getCargoAccessorialAPIRequest = void;

type getCargoAccessorialAPIResponse = CargoAccessorial[];

type getCargoPackageAPIRequest = void;

type getCargoPackageAPIResponse = CargoPackage[];


export type {
  getCargoTransportationAPIRequest,
  getCargoTransportationAPIResponse,
  getCargoAccessorialAPIRequest,
  getCargoAccessorialAPIResponse,
  getCargoPackageAPIRequest,
  getCargoPackageAPIResponse,
}; 