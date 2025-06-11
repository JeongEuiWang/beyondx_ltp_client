import { Calendar, Clock, MapPin } from "lucide-react";

const LocationCard = ({
  location,
  type,
}: {
  location: any;
  type: "Origin" | "Destination";
}) => {
  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const { date, time } = formatDateTime(location.request_datetime);

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <h3 className="text-md font-semibold text-gray-800">{type}</h3>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">Address</p>
          <p className="text-sm text-gray-900">{location.address}</p>
          <p className="text-sm text-gray-600">
            {location.city}, {location.county}, {location.state}{" "}
            {location.zip_code}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-gray-800 mr-1" />
            <span className="text-sm text-gray-600">{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-gray-800 mr-1" />
            <span className="text-sm text-gray-600">{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
