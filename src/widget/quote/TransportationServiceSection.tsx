import { CreateQuoteRequest, UpdateQuoteRequest } from "@/entities/quote";
import { Card, CardContent, Checkbox } from "@/shared/ui";
import { cn } from "@/shared/utils";
import { Label } from "@radix-ui/react-label";
import { BaggageClaim, Truck, Caravan } from "lucide-react";
import { CARGO_TRANSPORTATION_OPTIONS } from "@/shared/constants";

const TransportationServiceSection = ({
  formData,
  setFormData,
}: {
  formData: UpdateQuoteRequest | CreateQuoteRequest;
  setFormData: React.Dispatch<
    React.SetStateAction<UpdateQuoteRequest | CreateQuoteRequest>
  >;
}) => {
  const transportationOptions = CARGO_TRANSPORTATION_OPTIONS.map(
    (item: any) => ({
      value: item.id,
      label: item.name,
    })
  );

  const getTransportationIcon = (id: number) => {
    switch (id) {
      case 1:
        return BaggageClaim;
      case 2:
        return Truck;
      case 3:
        return Caravan;
      default:
        return Truck;
    }
  };

  const handleTransportationSelect = (transportationId: number) => {
    setFormData((prev) => ({
      ...prev,
      cargo_transportation_id: transportationId,
    }));
  };

  return (
    <Card className="bg-white rounded-lg">
      <CardContent className="px-6">
        <div className="flex items-center mb-6">
          <div className="p-1.5 bg-gray-50 rounded-md mr-3">
            <Truck className="w-5 h-5 text-gray-800" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Transportation Service
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium text-slate-700 mb-3 block">
              Service Type
            </Label>
            <div className="flex flex-wrap gap-3 justify-start">
              {transportationOptions.map((option) => {
                const transportationId = parseInt(option.value);
                const IconComponent = getTransportationIcon(transportationId);
                const isSelected =
                  formData.cargo_transportation_id === transportationId;

                return (
                  <Card
                    key={option.value}
                    className={cn(
                      "cursor-pointer border-2 hover:shadow-md w-40",
                      isSelected
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    )}
                    onClick={() => handleTransportationSelect(transportationId)}
                  >
                    <CardContent className="p-3 text-center">
                      <div className="flex flex-col items-center space-y-2">
                        <div
                          className={cn(
                            "p-2 rounded-md",
                            isSelected ? "bg-blue-100" : "bg-gray-50"
                          )}
                        >
                          <IconComponent
                            className={cn(
                              "w-6 h-6",
                              isSelected ? "text-blue-600" : "text-gray-700"
                            )}
                          />
                        </div>
                        <div>
                          <h3
                            className={cn(
                              "text-sm font-medium",
                              isSelected ? "text-blue-900" : "text-gray-900"
                            )}
                          >
                            {option.label}
                          </h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="priority"
              checked={formData.is_priority}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  is_priority: Boolean(checked),
                }))
              }
            />
            <label
              htmlFor="priority"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I want priority service
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransportationServiceSection;
