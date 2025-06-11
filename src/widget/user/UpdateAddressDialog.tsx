import { UserAddress, UserAddressWithId } from "@/entities/user_address";
import {
  AlertDialogHeader,
  Separator,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  Button,
  AlertDialogDescription,
} from "@/shared/ui";
import { useState } from "react";
import { X } from "lucide-react";
import AddressForm from "./AddressForm";
import { useUpdateUserAddress } from "@/features/user";
import { toast } from "sonner";

type UpdateAddressDialogProps = {
  children: React.ReactNode;
  address: UserAddressWithId;
};

function UpdateAddressDialog({ children, address }: UpdateAddressDialogProps) {
  const [open, setOpen] = useState(false);
  const [newAddress, setNewAddress] = useState<UserAddress>({
    name: address.name,
    state: address.state,
    city: address.city,
    county: address.county,
    zip_code: address.zip_code,
    location_type: address.location_type,
    address: address.address,
  });

  console.log(address);

  const { mutate } = useUpdateUserAddress({
    onSuccess: () => {
      toast.success("Address updated successfully");
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to update address Please try again");
    },
  });

  const handleUpdateAddress = async () => {
    if (newAddress.name === "" || newAddress.address === "") {
      toast.error("Please fill in all required fields");
      return;
    }
    mutate({
      id: address.id,
      user_id: address.user_id,
      ...newAddress,
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="max-h-[80vh] overflow-hidden">
        <AlertDialogHeader className="relative">
          <AlertDialogTitle>Update Address</AlertDialogTitle>
          <AlertDialogDescription className="text-xs">
            Update the address details by providing a nickname and address
            details.
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
          <AddressForm
            newAddress={newAddress}
            setNewAddress={setNewAddress}
            disabled={true}
          />
        </div>
        <div className="flex justify-end w-full">
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={!newAddress.address || !newAddress.name}
              onClick={() => handleUpdateAddress()}
            >
              Confirm
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default UpdateAddressDialog;
