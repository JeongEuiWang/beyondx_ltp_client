import { LocationType, UserAddress } from "@/entities/user_address";
import { useGetRateLocation } from "@/features/rate/queries";
import {
  AlertDialogHeader,
  Separator,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  Button,
  Input,
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  AlertDialogDescription,
  Label,
} from "@/shared/ui";
import { useEffect, useState } from "react";
import { Search, MapPin, AlertCircle, X } from "lucide-react";
import { useDebounce } from "@/shared/hooks";
import { RateLocation } from "@/entities/rate";
import AddressForm from "./AddressForm";
import { useCreateUserAddress } from "@/features/user";
import { toast } from "sonner";

type AddAddressDialogProps = {
  children: React.ReactNode;
};

type SearchType = "city" | "zipcode";

function AddAddressDialog({ children }: AddAddressDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("city");
  const [formMode, setFormMode] = useState<boolean>(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [newAddress, setNewAddress] = useState<UserAddress>({
    name: "",
    state: "",
    city: "",
    county: "",
    zip_code: "",
    location_type: LocationType.RESIDENTIAL,
    address: "",
  });

  const {
    data: searchResults = [],
    isFetched,
    error,
  } = useGetRateLocation({
    city: searchType === "city" ? debouncedSearchQuery : undefined,
    zip_code: searchType === "zipcode" ? debouncedSearchQuery : undefined,
  });

  const { mutate } = useCreateUserAddress({
    onSuccess: () => {
      toast.success("Address created successfully");
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to create address Please try again");
    },
  });

  const getPlaceholder = () => {
    return searchType === "city"
      ? "Enter city or county name"
      : "Enter zip code";
  };

  const handleFormMode = (address: RateLocation) => {
    const { city, county, state, zip_code } = address;
    setNewAddress({
      ...newAddress,
      city,
      county,
      state,
      zip_code,
    });
    setFormMode(true);
  };

  const handleCreateAddress = async () => {
    if(newAddress.name === "" || newAddress.address === "") {
      toast.error("Please fill in all required fields");
      return;
    }
    mutate({
      ...newAddress,
    });
  };

  useEffect(() => {
    if (!open) {
      const resetState = () => {
        setFormMode(false);
        setNewAddress({
          name: "",
          state: "",
          city: "",
          county: "",
          zip_code: "",
          location_type: LocationType.RESIDENTIAL,
          address: "",
        });
        setSearchQuery("");
        setSearchType("city");
      };
      
      setTimeout(resetState, 0);
    }
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="max-h-[80vh] overflow-hidden">
        <AlertDialogHeader className="relative">
          <AlertDialogTitle>Add Address</AlertDialogTitle>
          <AlertDialogDescription className="text-xs">
            Search for available addresses by entering a city or zip code,
            <br />
            then select an address and provide a nickname and address details.
          </AlertDialogDescription>
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 h-8 w-8 p-0 hover:bg-slate-100"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4 text-gray-800" />
          </Button>
        </AlertDialogHeader>
        <Separator />
        <div className="text-sm overflow-y-auto max-h-[60vh]">
          {!formMode && (
            <div>
              <div>
                <Label className="text-xs font-medium text-slate-600 mb-1">
                  Search Address
                </Label>

                <div className="flex space-x-2 mb-4">
                  <div className="w-30">
                    <Select
                      value={searchType}
                      onValueChange={(value: SearchType) =>
                        setSearchType(value)
                      }
                    >
                      <SelectTrigger className="w-30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="city">City</SelectItem>
                        <SelectItem value="zipcode">Zip Code</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-800" />
                    <Input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={getPlaceholder()}
                      className="pl-10 w-full"
                    />
                  </div>
                </div>
              </div>
              <div>
                {isFetched && searchResults.length > 0 && (
                  <div className="mt-2 space-y-2 max-h-80 overflow-y-auto">
                    {searchResults.map((address, index) => (
                      <Card
                        key={address.id || index}
                        className="p-0 cursor-pointer rounded-md shadow-none hover:bg-slate-50 transition-colors"
                        onClick={() => handleFormMode(address)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-gray-800 mt-0.5 flex-shrink-0" />
                            <div className="flex flex-1 items-center gap-4 min-w-0">
                              <div className="text-sm font-medium text-slate-900">
                                {address.city}
                                {address.county && `, ${address.county}`}
                                {address.state && `, ${address.state}`}
                              </div>
                              {address.zip_code && (
                                <div className="text-xs text-slate-500">
                                  {address.zip_code}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {isFetched && searchResults.length === 0 && (
                  <div className="mt-2 text-xs text-slate-500">
                    No addresses found for "{debouncedSearchQuery}"
                  </div>
                )}
                {error && (
                  <div className="mt-2 flex items-center space-x-1 text-xs text-red-600">
                    <AlertCircle className="h-3 w-3 text-gray-800" />
                    <span>Error searching addresses. Please try again.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {formMode && (
            <AddressForm
              newAddress={newAddress}
              setNewAddress={setNewAddress}
              disabled={true}
            />
          )}
        </div>
        {formMode && (
          <div className="flex justify-between w-full">
            <Button variant="ghost" onClick={() => setFormMode(false)}>
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                disabled={!newAddress.address || !newAddress.name}
                onClick={() => handleCreateAddress()}
              >
                Confirm
              </Button>
            </div>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddAddressDialog;
