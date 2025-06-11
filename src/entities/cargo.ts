type CargoTransportation = {
  id: number;
  name: string;
  description?: string;
};

type CargoAccessorial = {
  id: number;
  name: string;
  description?: string;
};

type Cargo = {
  id?: string;
  width: number;
  height: number;
  length: number;
  weight: number;
  quantity: number;
  package_description: string;
  cargo_stackable: boolean;
  cargo_temperature: string;
  is_hazardous: boolean;
  hazardous_detail: string;
};

type CargoPackage = {
  id: number;
  name: string;
  width: number | null;
  length: number | null;
  height: number | null;
};

export type { CargoTransportation, CargoAccessorial, Cargo, CargoPackage }; 