import { Pagination, PaginationItem, Stack } from "@mui/material";
import {
    useGridApiContext,
    useGridSelector,
    gridPageCountSelector,
    gridPageSelector,
  } from "@mui/x-data-grid";

export function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <div className="pagination-container">
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
        page={page + 1}
        count={pageCount}
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
      </div>
    );
  } 