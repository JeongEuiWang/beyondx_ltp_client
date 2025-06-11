import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PageHeader } from "@/shared/components";
import { Button, Card, Input, Label, Switch } from "@/shared/ui";
import { useConfirmQuote, useGetQuote } from "@/features/quote";
import { PageBoundary } from "@/widget/_suspense";
import {
  QuoteOverviewView,
  RouteInformationView,
  CargoInformationView,
} from "@/widget/quote";
import { toast } from "sonner";

const AdminQuoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { mutate: confirmQuote, isPending: isConfirming } = useConfirmQuote({
    onSuccess: () => {
      toast.success("Quote has been confirmed successfully!");
      navigate("/admin");
    },
  });

  const [actualPrice, setActualPrice] = useState<string>("");
  const [useCalculatedPrice, setUseCalculatedPrice] = useState(false);
  const { data: quote } = useGetQuote({
    quote_id: id!,
  });

  const handleConfirmQuote = async () => {
    if (!actualPrice || Number(actualPrice) <= 0) {
      toast.error("Please enter a valid actual price.");
      return;
    }

    confirmQuote({
      quote_id: id!,
      actual_price: Number(actualPrice),
    });
  };

  useEffect(() => {
    if (useCalculatedPrice) {
      setActualPrice(quote?.total_price.toString() || "");
    } else {
      setActualPrice("");
    }
  }, [useCalculatedPrice, quote]);

  return (
    <PageBoundary>
      <div className="min-h-screen bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageHeader
            title="Quote Review"
            description="Review quote details and confirm or reject the request."
            showBackButton
            onBack={() => navigate("/admin")}
          />

          <div className="space-y-6">
            <QuoteOverviewView quote={quote} />
            <RouteInformationView quote={quote} />
            <CargoInformationView quote={quote} />

            {quote?.order_status === "SUBMIT" && (
              <>
                <Card className="p-6 border border-gray-200 bg-white">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Admin Review
                  </h2>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700 mb-2">
                        Actual Price ($)
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          value={actualPrice}
                          onChange={(e) =>
                            setActualPrice(e.target.value)
                          }
                          placeholder="Enter actual price"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        This will be the final price charged to the customer.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="use-calculated-price"
                      checked={useCalculatedPrice}
                      onCheckedChange={setUseCalculatedPrice}
                    />
                    <Label htmlFor="use-calculated-price">
                      Use Calculated Price
                    </Label>
                  </div>
                </Card>
                <div className="flex justify-end space-x-3 pb-8">
                  <Button
                    variant="outline"
                    onClick={() => {}}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Reject Quote
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleConfirmQuote}
                    disabled={isConfirming || !actualPrice || Number(actualPrice) <= 0}
                  >
                    {isConfirming ? "Confirming..." : "Confirm Quote"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </PageBoundary>
  );
};

export default AdminQuoteDetail;
