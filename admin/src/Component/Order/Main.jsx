import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MaterialReactTable } from "material-react-table";
import * as JobService from "../../service/JobService";
import * as UserService from "../../service/UserService";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import {
  Avatar,
  Button,
  IconButton,
  Input,
  Typography,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";

import { Edit as EditIcon } from "@mui/icons-material";

import moment from "moment";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useSelector } from "react-redux";
function Main() {
  const { status: statusinit } = useSelector((state) => state.status);

  const [filteredData, setFilteredData] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [status, setStatus] = useState(statusinit);
  const [product, setProduct] = useState("");
  const [typeDate, setTypeDate] = useState("createdAt");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [user, setUser] = useState("");
  const [click, setClick] = useState(false);
  const history = useNavigate();
  const fetchJob = async () => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    const res = await JobService.getAllJob(access_token);

    return res;
  };
  const mutationDelete = useMutationHooks(async (data) => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    const { id } = data;
    const res = await JobService.deleteJob(id, access_token);
    return res;
  });
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
  const handleDeleteJob = (id) => {
    if (window.confirm("Bạn có đồng ý xóa không?")) {
      mutationDelete.mutate({
        id,
      });
    }
  };
  const { error, isSuccess } = mutationDelete;
  const { isLoading, data } = useQuery(["products"], fetchJob);
  const applyFilters = () => {
    if (!data || !Array.isArray(data)) {
      return;
    }
    const filtered = data?.filter((item) => {
      if (typeDate === "createdAt") {
        return (
          (!user ||
            item.designer?.designer_id?._id == user ||
            item.guest_create?._id == user) &&
          (!status || status === "All Status" || item.status === status) &&
          (!product || item.product.name === product) &&
          (!dateFrom ||
            moment(item.createdAt).utc().format("MM/DD/YYYY") ===
            moment(dateFrom).format("L"))
        );
      } else if (typeDate === "updatedAt") {
        return (
          (!user ||
            item.designer?.designer_id?._id == user ||
            item.guest_create?._id == user) &&
          (!status || status === "All Status" || item.status === status) &&
          (!product || item.product.name === product) &&
          (!dateFrom ||
            moment(item.updatedAt).utc().format("MM/DD/YYYY") ===
            moment(dateTo).format("L"))
        );
      }
      return false;
    });

    setFilteredData(filtered);
    setIsFilterActive(true);
  };
  const handleDeleteImg = async (id, designId) => {
    console.log(designId);
    if (window.confirm("Bạn có đồng ý xóa không?")) {
      axios
        .delete(`http://localhost:5000/api/v1/job/detele/img/${id}`, {
          data: { designId: designId },
        })
        .then((res) => {
          toastId.current = toast.success("Thành công!", Toastobjects);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000);
        })
        .catch((error) => {
          if (error.response.status === 500) {
            toastId.current = toast.error(
              "Có lỗi về server báo cho admin!",
              Toastobjects
            );
          } else {
            toastId.current = toast.error(
              error.response.data.message,
              Toastobjects
            );
          }
        });
    }
  };
  const fetchUser = async () => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));

    const res = await UserService.getAll(access_token);
    return res;
  };
  const showModal = (src) => {
    setClick(true);
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("modal-img").src = src;
  };

  const closeModal = () => {
    setClick(false);

    document.getElementById("modal").classList.add("hidden");
  };

  // const handleClick = () => {
  //   const url = this.props.url;
  //   if (url && url.startsWith("http")) {
  //     window.open(url, "_blank");
  //   }
  // };
  const { isLoading: isLoading1, data: data1 } = useQuery(["users"], fetchUser);
  
  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        filterVariant: "text",
        size: 50,

      },
      {
        header: "Tên nhân viên",
        accessorKey: "designer_id.name",
        filterVariant: "text",
        enableGlobalFilter: true,
        enableColumnFilter: false,
        size: 240,
      },
      {
        header: "Tên sản phẩm",
        accessorKey: "nameProduct",
        filterVariant: "text",
        enableGlobalFilter: true,
        enableColumnFilter: false,
        size: 240,
      },
      {
        header: "Số lượng",
        accessorKey: "quantity",
        filterVariant: "text",
        enableColumnFilter: false, // Disable column filter for this column
        size: 200,
      }
    ],
    []
  );
  
  const handleClearFrom = (e) => {
    setDateFrom("");
    setDateTo("");
    setProduct("");
    setStatus("Doing");
    setTypeDate("createdAt");
  };
  useEffect(() => {
    // hangldeGetAll();
    if (!error && isSuccess) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Thành công!", Toastobjects);
      }
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else if (error) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Có lỗi vui lòng thử lại", Toastobjects);
      }
    }
  }, [error, isSuccess]);
  useEffect(() => {
    if (!isLoading && data) {
      applyFilters();
    }
  }, [data, isLoading]);
  return (
    <>
      <Toast />
      <section className="content-main">
        <div className="content-header">
          {/* <h2 className="content-title ">Products</h2> */}
          {/* <div>
          <Link to="/addproduct" className="btn btn-primary">
            Create new
          </Link>
        </div> */}
        </div>
        <div
          id="modal"
          className="hidden fixed top-0 left-0 z-80 w-screen h-screen bg-black/70 flex justify-center items-center"
        >
          <a
            className="fixed z-90 top-6 right-8 text-white text-5xl font-bold"
            href="javascript:void(0)"
            onClick={closeModal}
          >
            &times;
          </a>

          <img
            id="modal-img"
            className="max-w-[800px] max-h-[600px] object-cover"
            alt="Modal Image"
          />
        </div>

        <div
          className={
            click ? " hidden card mb-4 shadow-sm" : "card mb-4 shadow-sm"
          }
        >
          <div className="card-body">
            {/* {loading ? (
            <Loading />
          ) : (
            <div className="row">
              <Table data={tempData} columns={columns} sub={true} />
            </div>
          )} */}
            <div className="grid xl:grid-cols-3 md:grid-cols-1 gap-4 xl:w-[70%] ">
              <div className="ml-2 mb-4">
                <Link to="/addProduct">
                  <Button
                    className="flex items-center gap-3 py-2"
                    style={{ textTransform: "none" }}
                  >
                    Thêm mới
                  </Button>

                </Link>
              </div>
            </div>

            <MaterialReactTable
              columns={columns}
              data={data ? data : []}
              state={{ isLoading: isLoading }}
              initialState={{ showColumnFilters: false }}
              enableRowActions
              enableColumnResizing
              renderRowActions={({ row, table }) => [
                <div >
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      console.log(row.original.id);
                      history(`/detail/${row.original.id}`);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </div>,
              ]}
              positionActionsColumn="last"
              filterFns={{
                filterProductName: (row, id, filterValue) =>
                  row.original.product.name
                    .toLowerCase()
                    .includes(filterValue.toLowerCase()),
              }}
              globalFilterFn="filterProductName"
              muiTableProps={{
                sx: {
                  border: "1px solid rgba(81, 81, 81, 1)",
                },
              }}
              muiTableHeadCellProps={{
                sx: {
                  border: "1px solid rgba(81, 81, 81, 1)",
                },
              }}
              muiTableBodyCellProps={{
                sx: {
                  border: "1px solid rgba(81, 81, 81, 1)",
                },
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Main;
