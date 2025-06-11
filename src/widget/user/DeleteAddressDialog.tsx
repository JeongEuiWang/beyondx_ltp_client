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
import { X, AlertTriangle } from "lucide-react";
import { useDeleteUserAddress } from "@/features/user";
import { toast } from "sonner";

type DeleteAddressDialogProps = {
  children: React.ReactNode;
  id: number;
};

function DeleteAddressDialog({
  children,
  id,
}: DeleteAddressDialogProps) {
  const [open, setOpen] = useState(false);

  const { mutate } = useDeleteUserAddress({
    onSuccess: () => {
      toast.success("Address deleted successfully");
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to delete address Please try again");
    },
  });

  const handleDeleteAddress = () => {
    mutate({ id });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="max-h-[80vh] overflow-hidden">
        <AlertDialogHeader className="relative">
          <AlertDialogTitle>Delete Address</AlertDialogTitle>
          <AlertDialogDescription className="text-xs">
            This action cannot be undone.
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

        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-4 w-4 text-gray-800" />
          </div>
          <div className="text-sm text-slate-700">
            Are you sure you want to delete this address?
          </div>
        </div>

        <div className="flex justify-end w-full">
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => handleDeleteAddress()}>
              Delete
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAddressDialog;
