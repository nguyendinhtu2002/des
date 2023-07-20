import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Link, useNavigate } from "react-router-dom";
import * as JobService from "../../service/JobService";
import { toast } from "react-toastify";
import Toast from "../../Component/LoadingError/Toast";
import moment from "moment/moment";

import {
  Avatar,
  Checkbox,
  Textarea,
  Typography,
  Button,
  Input,
  MenuItem,
  IconButton,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";
import {
  CloudArrowUpIcon,
  ArrowLongRightIcon,
  ArrowPathIcon,
  BookmarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useMutationHooks } from "../../hooks/useMutationHook";
const TableV3 = () => {
  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [status, setStatus] = useState("Waiting");
  const [product, setProduct] = useState("");
  const [typeDate, setTypeDate] = useState("createdAt");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [click, setClick] = useState(false);

  const history = useNavigate();
  const userLogin = useSelector((state) => state.user);
  const handleNoteDoubleClick = () => {
    setIsNoteVisible(true);
  };
  const fetchJob = async () => {
    const res = await JobService.getJobUser(userLogin.id);
    return res;
  };
  const { isLoading, data } = useQuery(["products"], fetchJob);
  const mutation = useMutationHooks(async (data) => {
    const { id, access_token } = data;
    await JobService.cancelJob(id, access_token);
  });
  const applyFilters = () => {
    const filtered = data.filter((item) => {
      if (typeDate === "createdAt") {
        return (
          (!status || status === "All Status" || item.status === status) &&
          (!product || item.product.name === product) &&
          (!dateFrom ||
            moment(item.createdAt).utc().format("MM/DD/YYYY") ===
              moment(dateFrom).format("L"))
        );
      } else if (typeDate === "updatedAt") {
        return (
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
  const handleDeleteImg = async (id, designId) => {
    console.log(designId);
    if (window.confirm("Bạn có đồng ý xóa không?")) {
      axios
        .delete(`https://api.mundesign.net/api/v1/job/detele/img/${id}`, {
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
  const { error, isSuccess } = mutation;

  const submitHandler = async (id) => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));

    mutation.mutate({
      id: id,
      access_token,
    });
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
  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        filterVariant: "text",
        // enableColumnFilter: false,
        size: 10,
      },
      {
        header: "Product",
        accessorKey: "product",
        filterVariant: "text",
        enableGlobalFilter: true,
        enableColumnFilter: false,
        Cell: ({ cell }) => {
          const { name, size, sku, image_url, Deadline } =
            cell.row.original.product;
          return (
            <div>
              <div className="pl-2 pt-2">
                <img
                  className="ng-scope h-5 w-[30px] cursor-default inline"
                  src={image_url}
                  onClick={() => showModal(image_url)}
                />
                <a className="text-[#3c8dbc]">
                  <h5 class="ng-binding inline text-[#3c8dbc] ml-1 ">{name}</h5>
                </a>
              </div>
              <div className="mt-[0.5px] pl-2">
                <strong>Created at:</strong>
                <span class="ng-binding">
                  {" "}
                  {moment(cell.row.original.createdAt).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                </span>
              </div>
              <div className=" pl-2">
                <strong>Created at:</strong>
                <span class="ng-binding text-[#a94442]">
                  {" "}
                  {moment(Deadline).format("YYYY-MM-DD HH:mm:ss")}
                </span>
              </div>
              <div className="flex flex-wrap m-h-[180px] overflow-y-scroll pl-2">
                <div className="p-[5px] mb-[10px] mr-[5px] border border-solid border-[#ddd] rounded-lg w-[160px]">
                  <a className="">
                    <Avatar
                      src={image_url}
                      size="lg"
                      alt="avatar"
                      onClick={() => showModal(image_url)}
                    />
                  </a>
                  <div className="inline-block align-middle">
                    <strong class="ng-binding">{sku} </strong>
                    <div class="ng-scope">
                      <strong>Size: </strong>{" "}
                      <span class="ng-binding"> {size + " "}</span>
                    </div>
                    <div class="ng-scope">
                      <strong>Color: </strong>{" "}
                      <span class="ng-binding"> Dark Heather</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        },
        size: 150,
      },
      {
        header: "Design",
        accessorKey: "designs",
        filterVariant: "text",
        enableColumnFilter: false, // Disable column filter for this column
        Cell: ({ cell }) => {
          const designs = cell.row.original.designs || []; // Get the designs array or use an empty array as a fallback
          return (
            <div>
              <div className="max-w-[500px] max-h-[2 50px] py-0 px-[10px] flex mt-2 relative mb-[200px]">
                {designs.map((design) => (
                  <div className="flex ml-2">
                    <Avatar
                      src={design.url}
                      alt="avatar"
                      size="xxl"
                      className="cd:max-w-fit"
                      variant="square"
                      onClick={(e) => showModal(design.url)}
                    />
                    <button
                      className="absolute top-0  p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors duration-300"
                      onClick={() =>
                        handleDeleteImg(cell.row.original.id, design._id)
                      }
                    >
                      <span className="sr-only">Remove</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414L11.414 10l2.293 2.293a1 1 0 0 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 0-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        },
        size: 180,
      },
      {
        header: "Designer",
        accessorKey: "designer",
        filterVariant: "text",
        // filterFn: (row, id, filterValue) => console.log(row),
        enableColumnFilter: false,
        Cell: ({ cell }) => {
          return (
            <div
              className={
                cell.row.original.attributes.outsource_note
                  ? "mb-[50px]"
                  : "mb-[75px]"
              }
            >
              <div class="form-group mx-2">
                <Input
                  label={cell.row.original.designer?.designer_id.name}
                  disabled
                />
              </div>
              <div class="form-group mx-2">
                <Input label={cell.row.original.guest_create.name} disabled />
              </div>
              <div className="mx-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-4 font-medium ml-2"
                >
                  Note outsource:
                </Typography>
                <Textarea
                  label="Message"
                  disabled
                  value={cell.row.original.attributes.outsource_note}
                />
              </div>
              <div className="mx-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-4 font-medium ml-2"
                >
                  Note Order:
                </Typography>
                <Textarea
                  label="Message"
                  disabled
                  value={cell.row.original.attributes.outsource_order}
                />
              </div>
              <Typography
                variant="small"
                color="blue-gray"
                className=" font-medium mx-4 mt-2"
              >
                Giá tiền:
              </Typography>
              <div className="relative flex mx-2 mt-2">
                <Input
                  type="email"
                  label="Email Address"
                  value={cell.row.original.attributes.outsource_price}
                  // onChange={onChange}
                  disabled
                  className="pr-20"
                  containerProps={{
                    className: "min-w-0",
                  }}
                />
              </div>
              <Typography
                variant="small"
                color="blue-gray"
                className=" font-medium mx-4 mt-2"
              >
                Tiền phạt:
              </Typography>
              <div className="relative flex mx-2 mt-2 ">
                <Input
                  type="email"
                  label="Email Address"
                  value={cell.row.original.attributes.monetary_fine}
                  // onChange={onChange}
                  disabled
                  className="pr-20"
                  containerProps={{
                    className: "min-w-0",
                  }}
                />
              </div>
            </div>
          );
        },
        // size: 290,
        maxSize: 200,
        minSize: 150,
      },
      {
        header: "Status",
        accessorKey: "status",
        filterVariant: "text",
        filterVariant: "select",
        filterSelectOptions: ["Waiting", "Review", ""],
        // enableColumnFilter: false, // Disable column filter for this column
        Cell: ({ cell }) => {
          return (
            <div className="mb-[594px]">
              <Input label={cell.row.original.status} disabled />
            </div>
          );
        },
        size: 100,
        minSize: 50,
        maxSize: 120,
      },
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
        toastId.current = toast.error(
          "Hủy lỗi vui lòng thử lại hoặc báo cho admin",
          Toastobjects
        );
      }
    }
  }, [error, isSuccess]);
  return (
    <>
      <Toast />
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
      <div className={click ? "hidden" : ""}>
        <div className="grid xl:grid-cols-3 md:grid-cols-1 gap-4 xl:w-[70%] ">
          <div>
            <Input
              label="Search products..."
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>
          <div>
            <Select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e)}
            >
              <Option value="All Status">All Status</Option>
              <Option value="Waiting">Waiting</Option>
              <Option value="Doing">Doing</Option>
              <Option value="Review">Review</Option>
              <Option value="Fix">Fix</Option>
              <Option value="Confirm">Confirm</Option>
              <Option value="Done">Done</Option>
            </Select>
          </div>
          <div>
            {/* <Select label="Select Version">
            <Option>Material Tailwind HTML</Option>
            <Option>Material Tailwind React</Option>
            <Option>Material Tailwind Vue</Option>
            <Option>Material Tailwind Angular</Option>
            <Option>Material Tailwind Svelte</Option>
          </Select> */}
          </div>
          <div>
            <Select
              label="Chọn type ngày"
              value={typeDate}
              onChange={(e) => setTypeDate(e)}
            >
              <Option value="createdAt">Ngày tạo</Option>
              <Option value="updatedAt">Ngày cập nhật</Option>
            </Select>
          </div>
          <div>
            <Input
              label="Date from"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div>
            <Input
              label="Date to"
              type="date"
              onChange={(e) => setDateTo(e.target.value)}
              value={dateTo}
            />
          </div>
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
                className="flex items-center gap-3 py-2 px-3"
                onClick={handleClearFrom}
              >
                <ArrowPathIcon strokeWidth={2} className=" w-5" />
                Clear form
              </Button>
            </div>
          </div>
        </div>
        <MaterialReactTable
          columns={columns}
          data={isFilterActive ? filteredData : data ?? []}
          state={{ isLoading: isLoading }}
          initialState={{ showColumnFilters: false }}
          enableRowActions
          enableColumnResizing
          renderRowActions={({ row, table }) => [
            <div className="mb-[596px] mx-auto">
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
    </>
  );
};

export default TableV3;
