import { useNavigate } from "react-router";
import { PageHeader } from "@/shared/components";
import { PageBoundary } from "@/widget/_suspense";
import QuoteDetailContent from "@/widget/quote/QuoteDetailContent";

const QuoteDetail = () => {
  const navigate = useNavigate();

  return (
    <PageBoundary>
      <div className="min-h-screen bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageHeader
            title="Quote Details"
            description="View and manage your shipment quote information."
            showBackButton
            onBack={() => navigate("/service")}
          />
          <QuoteDetailContent />
        </div>
      </div>
    </PageBoundary>
  );
};

export default QuoteDetail;
