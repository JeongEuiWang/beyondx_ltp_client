import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { PageHeader } from "@/shared/components";
import { Button } from "@/shared/ui";
import { useGetQuote, useUpdateQuote } from "@/features/quote";
import { UpdateQuoteRequest } from "@/entities/quote";
import { LocationType } from "@/entities/user_address";
import {
  CargoInformationSection,
  RouteInformationSection,
  TransportationServiceSection,
} from "@/widget/quote";
import { PageBoundary } from "@/widget/_suspense";
import { toast } from "sonner";
import { Cargo } from "@/entities/cargo";

const QuoteEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: quote } = useGetQuote({
    quote_id: id!,
  });

  const updateQuoteMutation = useUpdateQuote({
    onSuccess: (data) => {
      toast.success("Quote has been updated successfully!");
      navigate(`/service/quote/${data.id}`);
    },
    onError: (error) => {
      console.error("Quote update failed:", error);
      toast.error("An error occurred while updating the quote.");
    },
  });

  const [formData, setFormData] = useState<UpdateQuoteRequest>(() => quote);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.cargo_transportation_id) {
      toast.error("Please select a transportation service.");
      return;
    }

    if (
      formData.from_location.address === "" ||
      formData.to_location.address === ""
    ) {
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

    if (
      formData.cargo.filter((cargo: Cargo) => cargo.weight > 0).length === 0
    ) {
      toast.error("Please enter the weight of the cargo.");
      return;
    }

    const { id: from_location_id, ...from_location_rest } =
      formData.from_location;
    const { id: to_location_id, ...to_location_rest } = formData.to_location;
    const cargoData = formData.cargo.map((cargo: Cargo) => {
      const { id: cargo_id, ...cargo_rest } = cargo;
      return cargo_rest;
    });

    updateQuoteMutation.mutate({
      quote_id: id!,
      cargo_transportation_id: formData.cargo_transportation_id,
      is_priority: formData.is_priority,
      from_location: from_location_rest,
      to_location: to_location_rest,
      cargo: cargoData,
    });
  };

  console.log(formData);

  return (
    <PageBoundary>
      <div className="min-h-screen bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageHeader
            title="Edit Quote"
            description="Update the information for your shipment quote."
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
                onClick={() => navigate(`/quotes/${id}`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updateQuoteMutation.isPending}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                {updateQuoteMutation.isPending ? "Updating..." : "Update Quote"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageBoundary>
  );
};

export default QuoteEdit;
