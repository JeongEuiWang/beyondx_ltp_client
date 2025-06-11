import { Search, ListFilter, FileDown } from "lucide-react";
import { Button, Checkbox, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui";

interface DataTableToolbarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  onFilterClick?: () => void;
  onExportClick?: () => void;
  showFilters?: boolean;
  showExport?: boolean;
}

interface DataTablePaginationProps {
  selectedCount?: number;
  totalCount?: number;
  currentPage?: number;
  totalPages?: number;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export const DataTableToolbar = ({
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  onFilterClick,
  onExportClick,
  showFilters = true,
  showExport = true,
}: DataTableToolbarProps) => (
  <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="pl-9 pr-3 py-2 w-64 border-slate-200"
        />
      </div>
      {showFilters && (
        <Button variant="outline" onClick={onFilterClick} className="border-slate-200">
          <ListFilter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      )}
    </div>
    {showExport && (
      <Button variant="outline" onClick={onExportClick} className="border-slate-200">
        <FileDown className="w-4 h-4 mr-2" />
        Export
      </Button>
    )}
  </div>
);

export const DataTablePagination = ({
  selectedCount = 0,
  totalCount = 0,
  currentPage = 1,
  totalPages = 1,
  onPreviousPage,
  onNextPage,
  hasPreviousPage = false,
  hasNextPage = false,
}: DataTablePaginationProps) => (
  <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-sm">
    <div className="text-slate-600">
      Selected {selectedCount} of {totalCount}
    </div>
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onPreviousPage}
        disabled={!hasPreviousPage}
        className="border-slate-200"
      >
        Previous
      </Button>
      <span className="px-3 py-1 text-slate-700">Page {currentPage} of {totalPages}</span>
      <Button
        variant="outline"
        size="sm"
        onClick={onNextPage}
        disabled={!hasNextPage}
        className="border-slate-200"
      >
        Next
      </Button>
    </div>
  </div>
);

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Checkbox }; 