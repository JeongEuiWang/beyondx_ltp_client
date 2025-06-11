import { UserAddress, LocationType, UserAddressWithId } from "@/entities/user_address";
import { Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui";

const AddressForm = ({
  newAddress,
  setNewAddress,
  disabled = true,
}: {
  newAddress: UserAddress | UserAddressWithId;
  setNewAddress: (address: UserAddress | UserAddressWithId) => void;
  disabled?: boolean;
}) => {
  return (
    <div className="space-y-4 text-sm">
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">
          Address Nickname <strong className="text-red-500">*</strong>
        </label>
        <Input
          type="text"
          value={newAddress.name}
          onChange={(e) => {
            setNewAddress({ ...newAddress, name: e.target.value });
          }}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          placeholder="e.g., Home, Office"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">
          Street Address <strong className="text-red-500">*</strong>
        </label>
        <Input
          type="text"
          value={newAddress.address}
          onChange={(e) => {
            setNewAddress({ ...newAddress, address: e.target.value });
          }}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          placeholder="Street Address"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            State {!disabled ? <strong className="text-red-500">*</strong> : ""}
          </label>
          <Input
            type="text"
            value={newAddress.state}
            disabled={disabled}
            onChange={(e) => {
              if (!disabled) {
                setNewAddress({ ...newAddress, state: e.target.value });
              }
            }}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder="State"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            City {!disabled ? <strong className="text-red-500">*</strong> : ""}
          </label>
          <Input
            type="text"
            value={newAddress.city}
            disabled={disabled}
            onChange={(e) => {
              if (!disabled) {
                setNewAddress({ ...newAddress, city: e.target.value });
              }
            }}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder="City"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">
          County {!disabled ? <strong className="text-red-500">*</strong> : ""}
        </label>
        <Input
          type="text"
          value={newAddress.county}
          disabled={disabled}
          onChange={(e) => {
            if (!disabled) {
              setNewAddress({ ...newAddress, county: e.target.value });
            }
          }}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          placeholder="County"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Zip Code{" "}
            {!disabled ? <strong className="text-red-500">*</strong> : ""}
          </label>
          <Input
            type="text"
            value={newAddress.zip_code}
            disabled={disabled}
            onChange={(e) => {
              if (!disabled) {
                setNewAddress({ ...newAddress, zip_code: e.target.value });
              }
            }}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder="Zip Code"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Location Type <strong className="text-red-500">*</strong>
          </label>
          <Select
            value={newAddress.location_type}
            onValueChange={(value) => {
              setNewAddress({
                ...newAddress,
                location_type: value as LocationType,
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="RESIDENTIAL">Residential</SelectItem>
              <SelectItem value="COMMERCIAL">Commercial</SelectItem>
              <SelectItem value="AIRPORT">Airport</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};


export default AddressForm;