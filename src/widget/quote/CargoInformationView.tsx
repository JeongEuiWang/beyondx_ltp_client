import { Card, CardContent } from "@/shared/ui";
import { Package } from "lucide-react";
import CargoItemCard from "./CargoItemCard";

const CargoInformationView = ({ quote }: { quote: any }) => {
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
          {quote.cargo.map((cargoItem: any, index: number) => (
            <CargoItemCard
              key={cargoItem.id || index}
              cargoItem={cargoItem}
              index={index}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CargoInformationView;