import { CreateQuoteRequest, UpdateQuoteRequest } from "@/entities/quote";
import { Card, CardContent } from "@/shared/ui";
import { MapPin } from "lucide-react";
import AddressInput from "./AddressInput";
import { useGetCargoAccessorial } from "@/features/cargo";

const RouteInformationSection = ({
  formData,
  setFormData,
}: {
  formData: UpdateQuoteRequest | CreateQuoteRequest;
  setFormData: React.Dispatch<
    React.SetStateAction<UpdateQuoteRequest | CreateQuoteRequest>
  >;
}) => {
  const { data: cargoAccessorials = [] } = useGetCargoAccessorial();

 
  return (
    <Card className="border border-gray-200 bg-white rounded-lg shadow-none">
      <CardContent className="px-6">
        <div className="flex items-center mb-6">
          <div className="p-1.5 bg-gray-50 rounded-md mr-3">
            <MapPin className="w-5 h-5 text-gray-800" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Route Information
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AddressInput
            locationType="from_location"
            formData={formData}
            setFormData={setFormData}
            cargoAccessorials={cargoAccessorials}
          />
          <AddressInput
            locationType="to_location"
            formData={formData}
            setFormData={setFormData}
            cargoAccessorials={cargoAccessorials}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteInformationSection;
