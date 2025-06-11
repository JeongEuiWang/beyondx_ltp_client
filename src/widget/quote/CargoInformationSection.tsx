import { CreateQuoteRequest, UpdateQuoteRequest } from "@/entities/quote";
import { Button, Card, CardContent } from "@/shared/ui";
import { Package, Plus } from "lucide-react";
import { CargoItemForm } from ".";

const CargoInformationSection = ({
  formData,
  setFormData,
}: {
  formData: UpdateQuoteRequest | CreateQuoteRequest;
  setFormData: React.Dispatch<
    React.SetStateAction<UpdateQuoteRequest | CreateQuoteRequest>
  >;
}) => {
  const addCargo = () => {
    setFormData((prev) => ({
      ...prev,
      cargo: [
        ...prev.cargo,
        {
          width: 0,
          height: 0,
          length: 0,
          weight: 0,
          quantity: 1,
          package_description: "",
          cargo_stackable: false,
          cargo_temperature: "",
          is_hazardous: false,
          hazardous_detail: "",
        },
      ],
    }));
  };

  return (
    <Card className="border border-gray-200 bg-white rounded-lg shadow-none">
      <CardContent className="px-6">
        <div className="flex items-center mb-6">
          <div className="p-1.5 bg-gray-50 rounded-md mr-3">
            <Package className="w-5 h-5 text-gray-800" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Cargo Information
          </h2>
        </div>

        <div className="space-y-6">
          {formData.cargo.map((cargoItem, index) => (
            <CargoItemForm
              key={index}
              cargoItem={cargoItem}
              index={index}
              formData={formData}
              setFormData={setFormData}
            />
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addCargo}
            className="w-full border-dashed border-2 border-gray-300 hover:border-gray-400 bg-transparent hover:bg-gray-50 text-gray-600"
          >
            <Plus className="w-4 h-4 mr-2 text-gray-800" />
            Add Another Cargo Item
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CargoInformationSection;
