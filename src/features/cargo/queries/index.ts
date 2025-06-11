import { useQuery } from "@tanstack/react-query";
import { Query } from "@/features/_core/api";
import { getCargoTransportationAPI, getCargoAccessorialAPI, getCargoPackageAPI } from "@/features/cargo/api";
import {
  useGetCargoTransportationRequest,
  useGetCargoTransportationResponse,
  useGetCargoAccessorialRequest,
  useGetCargoAccessorialResponse,
  useGetCargoPackageRequest,
  useGetCargoPackageResponse,
} from "./type";

const useGetCargoTransportation: Query<useGetCargoTransportationRequest, useGetCargoTransportationResponse> = () => {
  return useQuery({
    queryKey: ["cargo", "transportation"],
    queryFn: async () => {
      const result = await getCargoTransportationAPI();
      return result;
    },
  });
};

const useGetCargoAccessorial: Query<useGetCargoAccessorialRequest, useGetCargoAccessorialResponse> = () => {
  return useQuery({
    queryKey: ["cargo", "accessorial"],
    queryFn: async () => {
      const result = await getCargoAccessorialAPI();
      return result;
    },
  });
};

const useGetCargoPackage: Query<useGetCargoPackageRequest, useGetCargoPackageResponse> = () => {
  return useQuery({
    queryKey: ["cargo", "package"],
    queryFn: async () => {
      const result = await getCargoPackageAPI();
      return result;
    },
  });
};

export { useGetCargoTransportation, useGetCargoAccessorial, useGetCargoPackage }; 