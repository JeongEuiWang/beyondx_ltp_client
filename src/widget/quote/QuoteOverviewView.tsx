import { CARGO_TRANSPORTATION_OPTIONS } from "@/shared/constants";
import { Card, CardContent, Badge } from "@/shared/ui";
import { FileText, Star } from "lucide-react";
import { Quote } from "@/entities/quote";

const QuoteOverviewView = ({ quote }: { quote: Quote }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ESTIMATE":
        return "text-slate-600 bg-slate-50";
      case "SUBMIT":
        return "text-yellow-600 bg-yellow-50";
      case "REJECT":
        return "text-red-600 bg-red-50";
      case "ACCEPT":
        return "text-green-600 bg-green-50";
      case "COMPLETED":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <Card className="border border-gray-200 bg-white rounded-lg shadow-none">
      <CardContent className="px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-1.5 bg-gray-50 rounded-md mr-3">
              <FileText className="w-5 h-5 text-gray-800" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Quote Overview
              </h2>
              <p className="text-sm text-gray-500">Quote ID: {quote.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {quote.is_priority && (
              <Badge className="text-yellow-600 bg-yellow-50 border-yellow-200">
                Priority
              </Badge>
            )}
            <Badge className={`${getStatusColor(quote.order_status)} border-0`}>
              {quote.order_status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Base Price
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                ${quote.base_price}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Extra Price
              </p>
              <p className="text-lg font-medium text-gray-700">
                ${quote.extra_price}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Total Price
              </p>
              <p className="text-3xl font-bold text-gray-700">
                ${quote.total_price}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Total Weight
              </p>
              <p className="text-lg font-medium text-gray-700">
                {quote.total_weight} lbs
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Transportation Service
              </p>
              <p className="text-sm text-gray-600">
                {
                  CARGO_TRANSPORTATION_OPTIONS.find(
                    (option) => option.id === quote.cargo_transportation_id
                  )?.name
                }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteOverviewView;
