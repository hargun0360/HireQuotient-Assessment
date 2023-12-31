import React, { useEffect, useState } from "react";
import useFetchData from "../Hooks/useFetchData";
import { FETCH_DATA_URL } from "../Constant";
import {
  DataGrid,
  GridRowModes,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { columnHeading } from "../Constant";
import { CustomPagination } from "../Components/CustomPagination";
import Spinner from "../Components/Spinner";
import { Stack } from "@mui/material";
import SearchBar from "../Components/SearchBar";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

const AdminPage = () => {
  const data = useFetchData(FETCH_DATA_URL);
  const [fetchData, setFetchData] = useState([]);
  const [input, setInput] = useState("");
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [rows, setRows] = useState(fetchData);

  useEffect(() => {
    setRows(fetchData);
  }, [fetchData]);

  useEffect(() => {
    if (data) {
      setFetchData(data);
    }
  }, [data]);

  useEffect(() => {
    if (input === "") {
      setFetchData(data);
    }
  }, [input]);

  const handleDeleteMultiple = (ids) => {
    const filteredRows = fetchData.filter((row) => !ids.includes(row.id));
    setFetchData(filteredRows);
  };

  const handleDeleteSingle = (id) => {
    const filteredRows = fetchData.filter((row) => row.id !== id);
    setFetchData(filteredRows);
  };

  const actionsColumn = [
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key="save"
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(params.id)}
            />,
            <GridActionsCellItem
              key="cancel"
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(params.id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon style={{ color: 'blue' }} />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(params.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon style={{ color: 'red' }}/>}
            label="Delete"
            onClick={handleDeleteClick(params.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const searchHandler = (userInput) => {
    setInput(userInput);
  };

  const deleteHandler = () => {
    handleDeleteMultiple(rowSelectionModel);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    handleDeleteSingle(id);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  if (fetchData && fetchData.length > 0) {
    return (
      <>
        <div className="datatable">
          <div className="datatableTitle search-bar">
            <SearchBar searchHandler={searchHandler} />
            <button onClick={deleteHandler} className="button">
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
            slots={{
              pagination: CustomPagination,
            }}
            components={{
              NoRowsOverlay: () => (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                </Stack>
              ),
            }}
           
            checkboxSelection
            getRowClassName={(params) => `fade-in-row`}
            showCellVerticalBorder
            showColumnVerticalBorder
            autoHeight
            rows={rows.filter((user) => {
              if (input === "") return user;
              return (
                user.name.toLowerCase().includes(input.toLowerCase()) ||
                user.email.toLowerCase().includes(input.toLowerCase()) ||
                user.role.toLowerCase().includes(input.toLowerCase())
              );
            })}
            columns={columnHeading.concat(actionsColumn)}
            pageSizeOptions={[10]}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Spinner />
      </>
    );
  }
};

export default AdminPage;
