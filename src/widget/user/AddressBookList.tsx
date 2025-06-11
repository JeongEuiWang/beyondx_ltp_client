import { MapPin, Search, Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import AddAddressDialog from "./AddAddressDialog";
import { useGetUserAddresses } from "@/features/user/queries";
import UpdateAddressDialog from "./UpdateAddressDialog";
import DeleteAddressDialog from "./DeleteAddressDialog";
import { Button, Input } from "@/shared/ui";

const AddressBookList = () => {
  const { data: addresses } = useGetUserAddresses();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white rounded-sm border border-slate-200 overflow-y-auto">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-gray-800" />
          <h2 className="text-md font-semibold text-slate-800">Address Book</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800" />
            <Input
              type="text"
              placeholder="Search addresses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1 w-48 h-8 text-sm border border-slate-300 rounded-sm"
            />
          </div>
          <AddAddressDialog>
            <Button variant="default" size="sm" className="flex items-center text-xs h-8 rounded-sm">
              <Plus className="h-2 w-2 text-white" />
              Add Address
            </Button>
          </AddAddressDialog>
        </div>
      </div>

      <div className="overflow-x-auto max-h-[400px] ">
        <table className="min-w-full text-sm text-left text-slate-600">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th scope="col" className="px-4 py-2">
                Name
              </th>
              <th scope="col" className="px-4 py-2">
                Address
              </th>
              <th scope="col" className="px-4 py-2">
                City
              </th>
              <th scope="col" className="px-4 py-2">
                State
              </th>
              <th scope="col" className="px-4 py-2">
                Zip Code
              </th>
              <th scope="col" className="px-4 py-2">
                Type
              </th>
              <th scope="col" className="px-4 py-2 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((address) => (
              <tr
                key={address.id}
                className="bg-white border-b border-slate-200 last:border-b-0 hover:bg-slate-50"
              >
                <td className="px-4 py-3 font-medium text-slate-900">
                  {address.name}
                </td>
                <td className="px-4 py-3">{address.address}</td>
                <td className="px-4 py-3">{address.city}</td>
                <td className="px-4 py-3">{address.state}</td>
                <td className="px-4 py-3">{address.zip_code}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded-md">
                    {address.location_type}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end space-x-1">
                    <UpdateAddressDialog address={address}>
                      <button className="p-1.5 text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                        <Edit className="h-4 w-4" />
                      </button>
                    </UpdateAddressDialog>
                    <DeleteAddressDialog id={address.id}>
                      <button className="p-1.5 text-gray-800 hover:text-red-600 hover:bg-red-50 rounded-md">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </DeleteAddressDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {addresses.length === 0 && (
          <div className="text-center py-8 text-sm text-slate-500">
            No matching addresses found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressBookList;
