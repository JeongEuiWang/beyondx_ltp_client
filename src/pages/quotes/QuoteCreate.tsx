import { useState } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "@/shared/components";
import { Button } from "@/shared/ui";
import { useCreateQuote } from "@/features/quote";
import { CreateQuoteRequest } from "@/entities/quote";
import { LocationType } from "@/entities/user_address";
import {
  CargoInformationSection,
  RouteInformationSection,
  TransportationServiceSection,
} from "@/widget/quote";
import { PageBoundary } from "@/widget/_suspense";
import { toast } from "sonner";

const QuoteCreate = () => {
  const navigate = useNavigate();

  const createQuoteMutation = useCreateQuote({
    onSuccess: (data) => {
      toast.success("Quote has been created successfully!");
      navigate("/service/dashboard");
    },
    onError: (error) => {
      console.error("Quote creation failed:", error);
      toast.error("An error occurred while creating the quote.");
    },
  });

  const [formData, setFormData] = useState<CreateQuoteRequest>({
    cargo_transportation_id: 0,
    is_priority: false,
    from_location: {
      state: "",
      county: "",
      city: "",
      zip_code: "",
      address: "",
      location_type: LocationType.COMMERCIAL,
      request_datetime: new Date().toISOString(),
      accessorials: [],
    },
    to_location: {
      state: "",
      county: "",
      city: "",
      zip_code: "",
      address: "",
      location_type: LocationType.COMMERCIAL,
      request_datetime: new Date().toISOString(),
      accessorials: [],
    },
    cargo: [
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
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.cargo_transportation_id) {
      toast.error("Please select a transportation service.");
      return;
    }

    if (formData.from_location.address === "" || formData.to_location.address === "") {
      toast.error("Please enter the address of the origin and destination.");
      return;
    }

    if (
      formData.from_location.location_type === LocationType.AIRPORT &&
      formData.to_location.location_type === LocationType.AIRPORT
    ) {
      toast.error("Both of the locations cannot be airports.");
      return;
    }

    if (!formData.from_location.city || !formData.to_location.city) {
      toast.error("Please enter origin and destination.");
      return;
    }

    if (formData.cargo.filter((cargo) => cargo.weight > 0).length === 0) {
      toast.error("Please enter the weight of the cargo.");
      return;
    }

    createQuoteMutation.mutate(formData);
  };

  return (
    <PageBoundary>
      <div className="min-h-screen bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageHeader
            title="Create New Quote"
            description="Enter the information for a new shipment quote."
            showBackButton
            onBack={() => navigate(-1)}
          />

          <form onSubmit={handleSubmit} className="space-y-8">
            <TransportationServiceSection
              formData={formData}
              setFormData={setFormData}
            />

            <RouteInformationSection
              formData={formData}
              setFormData={setFormData}
            />

            <CargoInformationSection
              formData={formData}
              setFormData={setFormData}
            />

            <div className="flex justify-end space-x-3 pb-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/service/dashboard")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createQuoteMutation.isPending}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                {createQuoteMutation.isPending ? "Creating..." : "Create Quote"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageBoundary>
  );
};

export default QuoteCreate;
