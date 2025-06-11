import { Card, CardContent } from "@/shared/ui";
import { MapPin } from "lucide-react";
import LocationCard from "./LocationCard";

const RouteInformationView = ({ quote }: { quote: any }) => {
  return (
    <Card className="border border-gray-200 bg-white rounded-lg shadow-none">
      <CardContent className="px-6">
        <div className="flex items-center mb-6">
          <div className="p-1.5 bg-gray-50 rounded-md mr-3">
            <MapPin className="w-5 h-5 text-gray-800" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Route Information</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LocationCard
            location={quote.from_location}
            type="Origin"
          />
          <LocationCard
            location={quote.to_location}
            type="Destination"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteInformationView;