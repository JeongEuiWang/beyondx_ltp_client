import {
  QuoteOverviewView,
  RouteInformationView,
  CargoInformationView,
} from "@/widget/quote";
import { Button } from "@/shared/ui";
import { Edit, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useGetQuote, useSubmitQuote } from "@/features/quote";
import { toast } from "sonner";

const QuoteDetailContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: quote } = useGetQuote({
    quote_id: id!,
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

  return (
    <div className="space-y-8">
      <QuoteOverviewView quote={quote} />
      <RouteInformationView quote={quote} />
      <CargoInformationView quote={quote} />
      <div className="flex justify-end space-x-3 pb-8">
        {quote?.order_status === "ESTIMATE" && (
          <>
            <Button
              variant="outline"
              onClick={() => navigate(`/service/quote/${quote?.id}/edit`)}
            >
              <Edit className="w-4 h-4 mr-2 text-gray-800" />
              Edit Quote
            </Button>
            <Button
              className="bg-gray-900 hover:bg-gray-800 text-white"
              onClick={handleSubmitQuote}
            >
              <CheckCircle className="w-4 h-4 mr-2 text-white" />
              Submit Quote
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default QuoteDetailContent;
