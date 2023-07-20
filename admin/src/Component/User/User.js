import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import * as UserService from "../../service/UserService";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import { MaterialReactTable } from "material-react-table";
import {
  Edit as EditIcon,
  EditNotifications,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { useMutationHooks } from "../../hooks/useMutationHook";
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  Checkbox,
  IconButton,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

const Users = (props) => {
  const { data } = props;
  const [loading, setLoading] = useState("");
  const [tempData, setTempData] = useState([]);
  const [role, setRole] = useState("");
  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const history = useNavigate();

  const toastId = React.useRef(null);
  const Toastobjects = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const options = {
    maximumFractionDigits: 0,
  };
  const mutationDelete = useMutationHooks(async (data) => {
    const { id, access_token } = data;
    const res = await UserService.deleteUSer(id, access_token);
    return res;
  });
  const formattedAmount = (amount, options) => {
    return amount.toLocaleString(undefined, options);
  };
  const handleDelete = async (id) => {
    if (id) {
      if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
        const access_token = JSON.parse(localStorage.getItem("access_token"));

        mutationDelete.mutate({
          id,
          access_token,
        });
      }
    }
  };
  const columns = useMemo(
    () => [
      {
        header: "Tên người dùng",
        accessorKey: "name", //must be strings
        id: "isActive",
        size: 100,
      },
      {
        accessorKey: "username",
        header: "Tài khoản",
        filterVariant: "text", // default
        size: 100,
      },
      {
        accessorKey: "email",
        header: "Email",
        filterVariant: "text", // default
        size: 150,
      },
      {
        accessorKey: "money",
        header: "Số dư",
        filterVariant: "range",
        filterFn: "between",
        Cell: ({ cell }) => <span>{formattedAmount(cell.getValue())}</span>,
        // filterVariant: "range-slider",
        // filterFn: "betweenInclusive",
        // muiTableHeadCellFilterSliderProps: {
        //   //no need to specify min/max/step if using faceted values
        //   marks: true,
        //   step: 5_000,
        //   // valueLabelFormat: (value) =>
        //   //   value.toLocaleString("en-US", {
        //   //     style: "currency",
        //   //     currency: "USD",
        //   //   }),
        // },
        size: 80,
      },

      {
        accessorKey: "role",
        header: "Role",
        maxSize: 50,
        minSize: 30,
      },
      {
        accessorKey: "createdAt",
        header: "Ngày tạo",
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const formattedValue = moment(value).format("YYYY-MM-DD HH:mm:ss");
          return <span>{formattedValue}</span>;
        },
        maxSize: 100,
        minSize: 80,
      },
    ],
    []
  );
  const applyFilters = () => {
    const filtered = data.filter((item) => {
      return item.role === role
    });

    setFilteredData(filtered);
    setIsFilterActive(true);
  };
  const { error, isSuccess } = mutationDelete;
  useEffect(() => {
    if (!error && isSuccess) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Thành công!", Toastobjects);
      }
      window.location.reload(() => {}, 2000);
    } else if (error) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(
          error.response.data.message,
          Toastobjects
        );
      }
    }
  }, [error, isSuccess]);

  return (
    <>
      <Toast />
      <div className="grid xl:grid-cols-3 md:grid-cols-1 gap-4 xl:w-[70%] pt-4">
        <div>
          <Select label="Role" onChange={(e) => setRole(e)}>
            <Option value="customer">Người dùng</Option>
            <Option value="guest">Khách hàng</Option>
          </Select>
        </div>
        <div>
          {/* <Input
            label="Search tên người dùng..."
            // value={product}
            // onChange={(e) => setProduct(e.target.value)}
          /> */}
        </div>

        <div></div>

        <div className="flex w-[80%] mb-5">
          <div className="">
            <Button
              className="flex items-center gap-3 py-2"
              onClick={applyFilters}
            >
              <MagnifyingGlassIcon strokeWidth={2} className=" w-5" /> Search
            </Button>
          </div>
          <div className="ml-2">
            <Button
              className="flex items-center gap-3 py-2"
              style={{ textTransform: "none" }}
              // onClick={handleClearFrom}
            >
              <ArrowPathIcon strokeWidth={2} className=" w-5" />
              Clear
            </Button>
          </div>
        </div>
      </div>
      <MaterialReactTable
        columns={columns}
        data={isFilterActive ? filteredData : data ?? []}
        initialState={{ showColumnFilters: false }}
        enableRowActions
        enableColumnResizing
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
            <IconButton
              color="secondary"
              onClick={() => {
                history(`/user/detail/${row.original._id}`);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                handleDelete(row.original._id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        positionActionsColumn="last"
      />
    </>
    // <DataTable
    //   columns={columns}
    //   data={filteredItems}
    //   pagination
    //   fixedHeader
    //   fixedHeaderScrollHeight="450px"
    //   progressComponent
    //   selectableRows
    //   selectableRowsHighlight
    //   subHeader
    //   subHeaderComponent={
    //     subHeaderComponent
    //   }
    // />
  );
};

export default Users;
