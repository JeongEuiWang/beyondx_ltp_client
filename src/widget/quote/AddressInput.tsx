import { CreateQuoteRequest, UpdateQuoteRequest } from "@/entities/quote";
import { LocationType, UserAddress } from "@/entities/user_address";
import { FormInput, FormSelect } from "@/shared/components";
import { Button, Input, Label, Checkbox } from "@/shared/ui";
import { MapPin } from "lucide-react";
import AddressSelectionDialog from "./AddressSelectionDialog";

const AddressInput = ({
  locationType,
  formData,
  setFormData,
  cargoAccessorials,
}: {
  locationType: "from_location" | "to_location";
  formData: UpdateQuoteRequest | CreateQuoteRequest;
  setFormData: React.Dispatch<
    React.SetStateAction<UpdateQuoteRequest | CreateQuoteRequest>
  >;
  cargoAccessorials: any[];
}) => {
  const locationData = formData[locationType];
  const isOrigin = locationType === "from_location";

  const locationTypeOptions = [
    { value: LocationType.COMMERCIAL, label: "Commercial" },
    { value: LocationType.RESIDENTIAL, label: "Residential" },
    { value: LocationType.AIRPORT, label: "Airport" },
  ];

  const toggleAccessorial = (
    locationType: "from_location" | "to_location",
    accessorial: any
  ) => {
    const currentAccessorials = formData[locationType].accessorials;
    const existingIndex = currentAccessorials.findIndex(
      (acc) => acc.cargo_accessorial_id === accessorial.id
    );

    if (existingIndex >= 0) {
      setFormData((prev) => ({
        ...prev,
        [locationType]: {
          ...prev[locationType],
          accessorials: currentAccessorials.filter(
            (_, i) => i !== existingIndex
          ),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [locationType]: {
          ...prev[locationType],
          accessorials: [
            ...currentAccessorials,
            {
              cargo_accessorial_id: accessorial.id,
              name: accessorial.name,
            },
          ],
        },
      }));
    }
  };

  const updateLocation = (
    locationType: "from_location" | "to_location",
    field: string,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [locationType]: {
        ...prev[locationType],
        [field]: value,
      },
    }));
  };

  const handleSelectFromAddressBook = (address: UserAddress) => {
    updateLocation(locationType, "city", address.city);
    updateLocation(locationType, "county", address.county);
    updateLocation(locationType, "state", address.state);
    updateLocation(locationType, "zip_code", address.zip_code);
    updateLocation(locationType, "address", address.address);
    updateLocation(locationType, "location_type", address.location_type);
  };

  const handleSelectFromSearch = (location: any) => {
    updateLocation(locationType, "city", location.city);
    updateLocation(locationType, "county", location.county);
    updateLocation(locationType, "state", location.state);
    updateLocation(locationType, "zip_code", location.zip_code);
    updateLocation(locationType, "address", "");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-semibold text-slate-800 border-b border-gray-100 pb-2">
          {isOrigin ? "Origin" : "Destination"}
        </h3>
        <AddressSelectionDialog
          locationType={locationType}
          onSelectAddress={handleSelectFromAddressBook}
          onSelectSearchedAddress={handleSelectFromSearch}
        >
          <Button variant="default" size="sm">
            <MapPin className="w-4 h-4 mr-2 text-white" />
            Search Available Address
          </Button>
        </AddressSelectionDialog>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-1">
            City
          </Label>
          <Input
            placeholder="City"
            value={locationData.city}
            onChange={(e) =>
              updateLocation(locationType, "city", e.target.value)
            }
            required
            disabled={true}
            className="bg-gray-50"
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-1">
            State
          </Label>
          <Input
            placeholder="State"
            value={locationData.state}
            onChange={(e) =>
              updateLocation(locationType, "state", e.target.value)
            }
            required
            disabled={true}
            className="bg-gray-50"
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-1 block">
            County
          </Label>
          <Input
            placeholder="County"
            value={locationData.county}
            onChange={(e) =>
              updateLocation(locationType, "county", e.target.value)
            }
            required
            disabled={true}
            className="bg-gray-50"
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-1 block">
            Zip Code
          </Label>
          <Input
            placeholder="Zip Code"
            value={locationData.zip_code}
            onChange={(e) =>
              updateLocation(locationType, "zip_code", e.target.value)
            }
            required
            disabled={true}
            className="bg-gray-50"
          />
        </div>
      </div>

      <FormInput
        label="Street Address"
        placeholder="Street Address"
        value={locationData.address}
        onChange={(e) =>
          updateLocation(locationType, "address", e.target.value)
        }
        required
      />

      <FormSelect
        label="Location Type"
        options={locationTypeOptions}
        value={locationData.location_type}
        onChange={(value) =>
          updateLocation(locationType, "location_type", value as LocationType)
        }
        required
      />

      <div>
        <Label className="text-sm font-medium text-slate-700 mb-2 block">
          Request Date & Time
        </Label>
        <Input
          type="datetime-local"
          value={locationData.request_datetime.slice(0, 16)}
          onChange={(e) =>
            updateLocation(locationType, "request_datetime", e.target.value)
          }
          required
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-slate-700 mb-2 block">
          Additional Services
        </Label>
        <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-md p-3">
          {cargoAccessorials.map((accessorial: any) => (
            <div key={accessorial.id} className="flex items-center space-x-2">
              <Checkbox
                id={`${locationType}-accessorial-${accessorial.id}`}
                checked={locationData.accessorials.some(
                  (acc) => acc.cargo_accessorial_id === accessorial.id
                )}
                onCheckedChange={() =>
                  toggleAccessorial(locationType, accessorial)
                }
              />
              <label
                htmlFor={`${locationType}-accessorial-${accessorial.id}`}
                className="text-sm text-slate-700 cursor-pointer"
              >
                {accessorial.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressInput;
