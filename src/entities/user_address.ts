enum LocationType {
  COMMERCIAL = "COMMERCIAL",
  RESIDENTIAL = "RESIDENTIAL",
  AIRPORT = "AIRPORT",
}

type UserAddress = {
  name: string;
  state: string;
  city: string;
  county: string;
  zip_code: string;
  location_type: LocationType;
  address: string;
};

type UserAddressWithId = UserAddress & {
  id: number;
  user_id: number;
};

export type { UserAddress, UserAddressWithId };
export { LocationType };
