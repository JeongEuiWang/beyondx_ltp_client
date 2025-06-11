import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/shared/ui";

import {
  PaginationInfo,
  PaginationActions,
} from "@/shared/hooks";

type PaginationControlsProps = {
  paginationInfo: PaginationInfo;
  paginationActions: PaginationActions;
  className?: string;
};
const PaginationControls = ({
  paginationInfo,
  paginationActions,
  className = "",
}: PaginationControlsProps) => {
  const { currentPage, totalPages, visiblePages, ellipsisInfo } =
    paginationInfo;

  const {
    goToPage,
    goToFirstPage,
    goToLastPage,
    goToPreviousPage,
    goToNextPage,
  } = paginationActions;

  // 페이지가 1개 이하면 페이지네이션을 표시하지 않음
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`${className}`}>
      <Pagination>
        <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToPreviousPage();
                }}
              />
            </PaginationItem>

            {ellipsisInfo.showFirstPage && (
              <>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      goToFirstPage();
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                {ellipsisInfo.showStartEllipsis && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              </>
            )}

            {visiblePages.map((pageNumber: number) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  isActive={pageNumber === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(pageNumber);
                  }}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}

            {ellipsisInfo.showLastPage && (
              <>
                {ellipsisInfo.showEndEllipsis && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      goToLastPage();
                    }}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToNextPage();
                }}
              />
            </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationControls;
