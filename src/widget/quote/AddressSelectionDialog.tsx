import { UserAddress } from "@/entities/user_address";
import { useGetRateLocation } from "@/features/rate";
import { useGetUserAddresses } from "@/features/user";
import { useDebounce } from "@/shared/hooks";
import {
  Button,
  Card,
  CardContent,
  Input,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@/shared/ui";
import { cn } from "@/shared/utils";
import { X, BookOpen, Search, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

const AddressSelectionDialog = ({
  children,
  locationType,
  onSelectAddress,
  onSelectSearchedAddress,
}: {
  children: React.ReactNode;
  locationType: "from_location" | "to_location";
  onSelectAddress: (address: UserAddress) => void;
  onSelectSearchedAddress: (location: any) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"addressbook" | "search">("addressbook");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"city" | "zipcode">("city");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data: userAddresses = [] } = useGetUserAddresses();

  const { data: searchResults = [] } = useGetRateLocation({
    city: searchType === "city" ? debouncedSearchQuery : undefined,
    zip_code: searchType === "zipcode" ? debouncedSearchQuery : undefined,
  });

  const handleSelectUserAddress = (address: UserAddress) => {
    onSelectAddress(address);
    setOpen(false);
  };

  const handleSelectSearchResult = (location: any) => {
    onSelectSearchedAddress(location);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setMode("addressbook");
      setSearchQuery("");
    }
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent
        className="max-h-[80vh] overflow-hidden max-w-2xl"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <AlertDialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <AlertDialogTitle>
                Select{" "}
                {locationType === "from_location" ? "Origin" : "Destination"}{" "}
                Address
              </AlertDialogTitle>
              <AlertDialogDescription>
                Choose an address from your address book or search for a new
                address.
              </AlertDialogDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="h-8 w-8 p-0 shrink-0"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4 text-gray-800" />
            </Button>
          </div>
        </AlertDialogHeader>
        <Separator />

        <div className="flex space-x-2 mb-4">
          <Button
            variant={mode === "addressbook" ? "default" : "outline"}
            onClick={() => setMode("addressbook")}
            size="sm"
            tabIndex={-1}
          >
            <BookOpen
              className={cn(
                "w-4 h-4 mr-2",
                mode === "addressbook" ? "text-white" : "text-gray-800"
              )}
            />
            Address Book
          </Button>
          <Button
            variant={mode === "search" ? "default" : "outline"}
            onClick={() => setMode("search")}
            size="sm"
            tabIndex={-1}
          >
            <Search
              className={cn(
                "w-4 h-4 mr-2",
                mode === "search" ? "text-white" : "text-gray-800"
              )}
            />
            Search Address
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[50vh]">
          {mode === "addressbook" && (
            <div className="space-y-1">
              {userAddresses.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="w-8 h-8 text-gray-800 mx-auto mb-2" />
                  <p className="text-sm">No saved addresses found</p>
                </div>
              ) : (
                userAddresses.map((address) => (
                  <Card
                    key={address.id}
                    className="p-0 cursor-pointer hover:bg-gray-50 transition-colors border-0 shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                    onClick={() => handleSelectUserAddress(address)}
                  >
                    <CardContent className="p-2">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-3 w-3 text-gray-800 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-gray-900 truncate">
                            {address.name}
                          </div>
                          <div className="text-xs text-gray-600 truncate">
                            {address.address}, {address.city}, {address.state}{" "}
                            {address.zip_code}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {address.location_type} • {address.county}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
          {mode === "search" && (
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Select
                  value={searchType}
                  onValueChange={(value: "city" | "zipcode") =>
                    setSearchType(value)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="city">City</SelectItem>
                    <SelectItem value="zipcode">Zip Code</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-800" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      searchType === "city"
                        ? "Enter city name"
                        : "Enter zip code"
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              {searchResults.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No results found</p>
                </div>
              )}
              {searchResults.length > 0 && (
                <div className="space-y-1">
                  {searchResults.map((location, index) => (
                    <Card
                      key={index}
                      className="p-0 cursor-pointer hover:bg-gray-50 transition-colors border-0 shadow-none focus:outline-none"
                      onClick={() => handleSelectSearchResult(location)}
                      tabIndex={-1}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSelectSearchResult(location);
                        }
                      }}
                    >
                      <CardContent className="p-2">
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-3 w-3 text-gray-800 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-gray-900 truncate">
                              {location.city}, {location.county},{" "}
                              {location.state}
                            </div>
                            <div className="text-xs text-gray-500">
                              {location.zip_code}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddressSelectionDialog;
