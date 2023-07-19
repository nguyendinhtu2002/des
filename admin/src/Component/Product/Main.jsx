import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MaterialReactTable } from "material-react-table";
import * as JobService from "../../service/JobService";
import * as UserService from "../../service/UserService";

import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Toast from "../../Component/LoadingError/Toast";
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

import { Edit as EditIcon } from "@mui/icons-material";
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
function Main() {
  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [status, setStatus] = useState("");
  const [product, setProduct] = useState("");
  const [typeDate, setTypeDate] = useState("createdAt");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [designer, setDesigner] = useState("");
  const [user, setUser] = useState("");
  const history = useNavigate();
  const userLogin = useSelector((state) => state.user);
  const handleNoteDoubleClick = () => {
    setIsNoteVisible(true);
  };
  const fetchJob = async () => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    const res = await JobService.getAllJob(access_token);

    return res;
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
  const { isLoading, data } = useQuery(["products"], fetchJob);
  const applyFilters = () => {
    const filtered = data.filter((item) => {
      if (typeDate === "createdAt") {
        return (
          (!user || item.designer?.designer_id?._id == user) &&
          (!status || status === "All Status" || item.status === status) &&
          (!product || item.product.name === product) &&
          (!dateFrom ||
            moment(item.createdAt).utc().format("MM/DD/YYYY") ===
              moment(dateFrom).format("L"))
        );
      } else if (typeDate === "updatedAt") {
        return (
          (!user || item.designer.designer_id._id == user) &&
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

    const res = await UserService.getUserByCustomer(access_token);
    return res;
  };
  const { isLoading: isLoading1, data: data1 } = useQuery(["users"], fetchUser);
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
          const { name, size, sku, image_url } = cell.row.original.product;
          return (
            <div>
              <div className="pl-2 pt-2">
                <img
                  className="ng-scope h-5 w-[30px] cursor-default inline"
                  src={image_url}
                />
                <a className="text-[#3c8dbc]">
                  <h5 class="ng-binding inline text-[#3c8dbc] ml-1 ">{name}</h5>
                </a>
                <div class="form-check pt-2">
                  <Checkbox
                    label={
                      <Typography
                        variant="small"
                        color="gray"
                        className="flex items-center font-normal"
                      >
                        Multiple design
                      </Typography>
                    }
                    containerProps={{ className: "-ml-2.5 py-0" }}
                    disabled
                  />
                </div>
                <div class="form-check">
                  <Checkbox
                    label={
                      <Typography
                        variant="small"
                        color="gray"
                        className="flex items-center font-normal"
                      >
                        Double sided
                      </Typography>
                    }
                    containerProps={{ className: "-ml-2.5 py-0" }}
                    disabled
                  />
                </div>
              </div>
              <div className="mt-[0.5px] pl-2">
                <strong>Độ ưu tiên: </strong>
                <span className="bg-[#d2d6de] rounded py-[2px] px-[7px] text-[10px] mt-0 mx-0 mb-[3px] text-center inline-block">
                  Ưu tiên
                </span>
              </div>
              <div className="mt-[0.5px] pl-2">
                <strong>Created at:</strong>
                <span class="ng-binding"> 16:12' 12/07/2023</span>
              </div>
              <div className=" pl-2">
                <strong>Created at:</strong>
                <span class="ng-binding text-[#a94442]">
                  {" "}
                  12:42' 13/07/2023
                </span>
              </div>
              <div className="flex flex-wrap m-h-[180px] overflow-y-scroll pl-2">
                <div className="p-[5px] mb-[10px] mr-[5px] border border-solid border-[#ddd] rounded-lg w-[160px]">
                  <a className="">
                    <Avatar
                      src="https://cdn.prtvstatic.com/unsafe/600x0/assets.printerval.com/2023/05/17/646474149ef240.11658332.jpg"
                      size="lg"
                      alt="avatar"
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
        size: 200,
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
        size: 200,
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
                  ? "mb-[30px]"
                  : "mb-[60px]"
              }
            >
              <div class="form-group mx-2 mb-4">
                <Input
                  label={cell.row.original.designer?.designer_id.name}
                  disabled
                />
              </div>
              <div class="form-group mx-2 mb-1">
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
                <div
                  className="pre-note ng-binding ml-2 cursor-default"
                  onDoubleClick={handleNoteDoubleClick}
                  aria-hidden={!isNoteVisible}
                >
                  {cell.row.original.attributes.outsource_note}
                </div>
                {/* {isNoteVisible && <Textarea label="Message" />}
                  {isNoteVisible && (
                    <Button
                      size="sm"
                      className="rounded-md"
                      onClick={() => setIsNoteVisible(false)}
                    >
                      Save
                    </Button>
                  )} */}
                <Typography
                  variant="small"
                  color="blue-gray"
                  className=" font-medium mx-2 mt-2"
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
                  <Button
                    size="sm"
                    // color={email ? "blue" : "blue-gray"}
                    // disabled={!email}
                    disabled
                    className="!absolute right-1 top-1 rounded"
                  >
                    Lưu
                  </Button>
                </div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className=" font-medium mx-2 mt-2"
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
                  <Button
                    size="sm"
                    // color={email ? "blue" : "blue-gray"}
                    // disabled={!email}
                    disabled
                    className="!absolute right-1 top-1 rounded"
                  >
                    Lưu
                  </Button>
                </div>
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
            <div className="mb-[320px]">
              <Input label={cell.row.original.status} disabled />
              {/* <Button
                size="sm"
                // color={email ? "blue" : "blue-gray"}
                // disabled={!email}
                // disabled
                className="mt-2"
                onClick={() => submitHandler(cell.row.original.id)}
              >
                Hủy job
              </Button> */}
            </div>
          );
        },
        size: 125,
        minSize: 100,
        maxSize: 140,
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
  return (
    <section className="content-main">
      <div className="content-header">
        {/* <h2 className="content-title ">Products</h2> */}
        {/* <div>
          <Link to="/addproduct" className="btn btn-primary">
            Create new
          </Link>
        </div> */}
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          {/* {loading ? (
            <Loading />
          ) : (
            <div className="row">
              <Table data={tempData} columns={columns} sub={true} />
            </div>
          )} */}
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
                <Option value="Waiting Admin">Waiting Admin</Option>
                <Option value="Waiting">Waiting</Option>
                <Option value="Doing">Doing</Option>
                <Option value="Review">Review</Option>
                <Option value="Fix">Fix</Option>
                <Option value="Confirm">Confirm</Option>
                <Option value="Done">Done</Option>
              </Select>
            </div>
            <div>
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => setUser(e.target.value)}
              >
                <option selected>Choose Des</option>
                {data1?.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))}
              </select>
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
                  <MagnifyingGlassIcon strokeWidth={2} className=" w-5" />{" "}
                  Search
                </Button>
              </div>
              <div className="ml-2">
                <Button
                  className="flex items-center gap-3 py-2"
                  style={{ textTransform: "none" }}
                  onClick={handleClearFrom}
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
            state={{ isLoading: isLoading }}
            initialState={{ showColumnFilters: false }}
            enableRowActions
            enableColumnResizing
            renderRowActions={({ row, table }) => [
              <div className="mb-[326px]">
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
  );
}

export default Main;
