import { AlertCircle } from "lucide-react";
import { Badge } from "@/shared/ui";

const CargoItemCard = ({
  cargoItem,
  index,
}: {
  cargoItem: any;
  index: number;
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50/30">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-md font-semibold text-gray-800">
          Cargo Item {index + 1}
        </h4>
        <div className="flex items-center space-x-2">
          {cargoItem.cargo_stackable && (
            <Badge
              variant="outline"
              className="text-slate-600 border-slate-200"
            >
              Stackable
            </Badge>
          )}
          {cargoItem.is_hazardous && (
            <Badge variant="outline" className="text-red-600 border-red-200">
              <AlertCircle className="w-3 h-3 mr-1" />
              Hazardous
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
          <p className="text-sm text-gray-900">
            {cargoItem.package_description}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Weight</p>
          <p className="text-sm text-gray-900">{cargoItem.weight} lbs</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Quantity</p>
          <p className="text-sm text-gray-900">{cargoItem.quantity}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">
            Dimensions (L×W×H)
          </p>
          <p className="text-sm text-gray-900">
            {cargoItem.length}" × {cargoItem.width}" × {cargoItem.height}"
          </p>
        </div>
        {cargoItem.cargo_temperature && (
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Temperature
            </p>
            <p className="text-sm text-gray-900">
              {cargoItem.cargo_temperature}
            </p>
          </div>
        )}
        {cargoItem.is_hazardous && cargoItem.hazardous_detail && (
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Hazardous Details
            </p>
            <p className="text-sm text-gray-900">
              {cargoItem.hazardous_detail}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CargoItemCard;
