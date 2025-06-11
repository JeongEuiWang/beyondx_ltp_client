import { FileText, MapPin, Plus, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";
import {
  StatusBadge,
  PaginationControls,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components";
import { Button, Card } from "@/shared/ui";
import { useGetQuotes } from "@/features/quote";
import usePagination from "@/shared/hooks/usePagination";
import { PageBoundary } from "@/widget/_suspense";

const Dashboard = () => {
  const navigate = useNavigate();

  const { data: quotes = [] } = useGetQuotes();

  const {
    currentData: currentQuotes,
    totalItems,
    paginationInfo,
    paginationActions,
  } = usePagination(quotes, { itemsPerPage: 10 });

  const totalQuotes = quotes.length;
  const estimateQuotes = quotes.filter((q) => q.order_status === "ESTIMATE").length;
  const submitQuotes = quotes.filter((q) => q.order_status === "SUBMIT").length;
  const rejectQuotes = quotes.filter((q) => q.order_status === "REJECT").length;
  const acceptQuotes = quotes.filter((q) => q.order_status === "ACCEPT").length;
  const completedQuotes = quotes.filter((q) => q.order_status === "COMPLETED").length;

  return (
    <PageBoundary>
      <div className="min-h-screen bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Dashboard
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage your quotes and track performance metrics
                </p>
              </div>
              <Button
                onClick={() => navigate("/service/quote")}
                className="bg-gray-900 hover:bg-gray-800 text-white shadow-sm border-0"
              >
                <Plus className="w-4 h-4 mr-2 text-white" />
                Create Quote
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="p-1.5 bg-gray-50 rounded-md">
                  <FileText className="w-4 h-4 text-gray-800" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Total Quotes
                  </p>
                  <p className="text-lg font-semibold text-gray-900 mt-0.5">
                    {totalQuotes}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="p-1.5 bg-green-50 rounded-md">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Accepted
                  </p>
                  <div className="flex items-baseline space-x-2 mt-0.5">
                    <p className="text-lg font-semibold text-gray-900">
                      {acceptQuotes}
                    </p>
                    <p className="text-xs text-gray-400">
                      {totalQuotes > 0
                        ? `${((acceptQuotes / totalQuotes) * 100).toFixed(
                            0
                          )}%`
                        : "0%"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="p-1.5 bg-yellow-50 rounded-md">
                  <Clock className="w-4 h-4 text-yellow-600" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Submit
                  </p>
                  <p className="text-lg font-semibold text-gray-900 mt-0.5">
                    {submitQuotes}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="px-4 border border-gray-200 bg-white rounded-lg shadow-none">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Quotes
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-gray-100">
                    <TableHead className="font-medium text-gray-900 text-sm">
                      Quote ID
                    </TableHead>
                    <TableHead className="font-medium text-gray-900 text-sm">
                      Route
                    </TableHead>
                    <TableHead className="font-medium text-gray-900 text-sm">
                      Status
                    </TableHead>
                    <TableHead className="w-20 pr-6"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentQuotes.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center py-12 text-gray-500"
                      >
                        <div className="flex flex-col items-center">
                          <FileText className="w-8 h-8 text-gray-800 mb-3" />
                          <p className="text-sm font-medium">No quotes found</p>
                          <p className="text-xs text-gray-400 mt-1">
                            Create your first quote to get started
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentQuotes.map((quote) => (
                      <TableRow
                        key={quote.id}
                        className="hover:bg-gray-50/50 border-b border-gray-50"
                      >
                        <TableCell className="font-mono text-sm text-gray-900 font-medium">
                          {quote.id || "N/A"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm text-gray-700">
                            <MapPin className="w-3.5 h-3.5 mr-2 text-gray-800" />
                            <span className="truncate max-w-[180px]">
                              {quote.from_location?.city},{" "}
                              {quote.from_location?.state}
                              <span className="text-gray-400 mx-1">→</span>
                              {quote.to_location?.city},{" "}
                              {quote.to_location?.state}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={quote.order_status} />
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-xs px-3 py-1"
                            onClick={() =>
                              navigate(`/service/quote/${quote.id}`)
                            }
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {totalItems} total quotes
              </div>
              <PaginationControls
                paginationInfo={paginationInfo}
                paginationActions={paginationActions}
              />
            </div>
          </Card>
        </div>
      </div>
    </PageBoundary>
  );
};

export default Dashboard;
