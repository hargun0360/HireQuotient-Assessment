import React, { useEffect, useState } from "react";
import useFetchData from "../Hooks/useFetchData";
import { FETCH_DATA_URL } from "../Constant";
import {
  DataGrid,
  GridRowModes,
  GridActionsCellItem,
  GridRowEditStopReasons,
  useGridApiContext,
  useGridSelector,
  gridPageCountSelector,
  gridPageSelector,
} from "@mui/x-data-grid";
import {
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { columnHeading } from "../Constant";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeSharpIcon from "@mui/icons-material/ModeSharp";

const AdminPage = () => {
  const data = useFetchData(FETCH_DATA_URL);
  const [fetchData, setFetchData] = useState([]);
  const [input, setInput] = useState("");
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useEffect(() => {
    if (data) {
      setFetchData(data);
    }
  }, [data]);

  const handleDeleteMultiple = (ids) => {
    const filteredRows = fetchData.filter((row) => !ids.includes(row.id));
    setFetchData(filteredRows);
  };

  const handleDeleteSingle = (id) => {
    const filteredRows = fetchData.filter((row) => row.id !== id);
    setFetchData(filteredRows);
  };

  return (
    <>
      <div className="datatable">
        <div className="datatableTitle">
          {/* <SearchBar searchHandler={searchHandler} /> */}
          <button className="button">
            <DeleteIcon />
          </button>
        </div>
        <DataGrid
          className="datagrid"
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          columns={columnHeading || []}
          // slots={{
          //   pagination: CustomPagination,
          // }}
          
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
            "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within": {
              outline: "none",
            },
          }}
          checkboxSelection
          getRowClassName={(params) => `fade-in-row`}
          showCellVerticalBorder
          showColumnVerticalBorder
          autoHeight
          rows={fetchData.filter((user) => {
            if (input === "") return user;
            return (
              user.name.toLowerCase().includes(input.toLowerCase()) ||
              user.email.toLowerCase().includes(input.toLowerCase()) ||
              user.role.toLowerCase().includes(input.toLowerCase())
            );
          })}
          // columns={columns.concat(actionsColumn)}
          pageSizeOptions={[10]}
          editMode="row"
          // rowModesModel={rowModesModel}
          // onRowModesModelChange={handleRowModesModelChange}
          // onRowEditStop={handleRowEditStop}
          // processRowUpdate={processRowUpdate}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
        />
      </div>
    </>
  );
};

export default AdminPage;
