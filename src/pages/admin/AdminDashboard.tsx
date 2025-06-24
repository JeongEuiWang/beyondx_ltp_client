import { FileText, MapPin, Clock, CircleCheck } from "lucide-react";
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
import { Button, Card, Badge } from "@/shared/ui";
import { useGetAdminQuotes } from "@/features/admin";
import usePagination from "@/shared/hooks/usePagination";
import { PageBoundary } from "@/widget/_suspense";
import { CARGO_TRANSPORTATION_OPTIONS } from "@/shared/constants";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const { data: allQuotes = [] } = useGetAdminQuotes({
    status: ["SUBMIT", "ACCEPT"],
  });


  const {
    currentData: currentQuotes,
    paginationInfo,
    paginationActions,
  } = usePagination(allQuotes, { itemsPerPage: 10 });

  const submittedQuotes = allQuotes.filter((q) => q.order_status === "SUBMIT").length;

  const confirmedQuotes = allQuotes.filter((q) => q.order_status === "ACCEPT").length;

  return (
    <PageBoundary>
      <div className="min-h-screen bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Review and manage submitted quotes
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="p-1.5 bg-blue-50 rounded-md">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Pending Review
                  </p>
                  <p className="text-lg font-semibold text-gray-900 mt-0.5">
                    {submittedQuotes}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="p-1.5 bg-green-50 rounded-md">
                  <CircleCheck className="w-4 h-4 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Confirmed
                  </p>
                  <p className="text-lg font-semibold text-gray-900 mt-0.5">
                    {confirmedQuotes}
                  </p>
                </div>
              </div>
            </div>

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
                    {allQuotes.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="px-4 border border-gray-200 bg-white rounded-lg shadow-none">
            <h2 className="text-lg font-semibold text-gray-900">
              Submitted Quotes - Pending Review
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-gray-100">
                    <TableHead className="font-medium text-gray-900 text-sm">
                      Order ID
                    </TableHead>
                    <TableHead className="font-medium text-gray-900 text-sm">
                      Priority
                    </TableHead>
                    <TableHead className="font-medium text-gray-900 text-sm">
                      Route
                    </TableHead>
                    <TableHead className="font-medium text-gray-900 text-sm">
                      Transportation
                    </TableHead>
                    <TableHead className="font-medium text-gray-900 text-sm">
                      Submitted Date
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
                        colSpan={7}
                        className="text-center py-12 text-gray-500"
                      >
                        <div className="flex flex-col items-center">
                          <Clock className="w-8 h-8 text-gray-800 mb-3" />
                          <p className="text-sm font-medium">
                            No pending quotes
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            All quotes have been reviewed
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentQuotes.map((quote) => (
                      <TableRow
                        key={quote.order_primary}
                        className="hover:bg-gray-50/50 border-b border-gray-50"
                      >
                        <TableCell className="font-mono text-sm text-gray-900 font-medium">
                          {quote.order_primary || "N/A"}
                        </TableCell>
                        <TableCell>
                          {quote.is_priority ? (
                            <Badge
                              variant="default"
                              className="items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border-0"
                            >
                              Yes
                            </Badge>
                          ) : (
                            <Badge
                              variant="default"
                              className="items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border-0"
                            >
                              Normal
                            </Badge>
                          )}
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
                        <TableCell className="text-sm text-gray-600">
                          {
                            CARGO_TRANSPORTATION_OPTIONS.find(
                              (option) =>
                                option.id === quote.cargo_transportation_id
                            )?.name
                          }
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {quote.created_at
                            ? new Date(quote.created_at).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={quote.order_status} />
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs px-3 py-1"
                            onClick={() => navigate(`/admin/quote/${quote.id}`)}
                          >
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="py-4 border-t border-gray-100 bg-white flex justify-between items-center">
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

export default AdminDashboard;
