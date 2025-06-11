import {
  QuoteOverviewView,
  RouteInformationView,
  CargoInformationView,
} from "@/widget/quote";
import { Button } from "@/shared/ui";
import { Edit, Trash2, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useDeleteQuote, useGetQuote, useSubmitQuote } from "@/features/quote";
import { toast } from "sonner";

const QuoteDetailContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: quote } = useGetQuote({
    quote_id: id!,
  });

  const deleteQuoteMutation = useDeleteQuote({
    onSuccess: () => {
      toast.success("Quote has been deleted successfully!");
      navigate("/service");
    },
    onError: (error) => {
      console.error("Quote delete failed:", error);
      toast.error("An error occurred while deleting the quote.");
    },
  });

  const submitQuoteMutation = useSubmitQuote({
    onSuccess: () => {
      toast.success("Quote has been submitted successfully!");
      navigate("/service");
    },
  });

  const handleSubmitQuote = () => {
    submitQuoteMutation.mutate({
      quote_id: id!,
    });
  };

  const handleDeleteQuote = () => {
    if (confirm("Are you sure you want to delete this quote?")) {
      deleteQuoteMutation.mutate({
        quote_id: id!,
      });
    }
  };

  return (
    <div className="space-y-8">
      <QuoteOverviewView quote={quote} />
      <RouteInformationView quote={quote} />
      <CargoInformationView quote={quote} />
      <div className="flex justify-end space-x-3 pb-8">
        <Button
          variant="outline"
          onClick={() => navigate(`/service/quote/${quote?.id}/edit`)}
        >
          <Edit className="w-4 h-4 mr-2 text-gray-800" />
          Edit Quote
        </Button>
        {quote?.order_status === "ESTIMATE" && (
          <Button
            className="bg-gray-900 hover:bg-gray-800 text-white"
            onClick={handleSubmitQuote}
          >
            <CheckCircle className="w-4 h-4 mr-2 text-white" />
            Submit Quote
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuoteDetailContent;
