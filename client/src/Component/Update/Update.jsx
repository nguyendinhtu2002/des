import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { useSelector } from "react-redux";
import { Option, Select, Textarea } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import Toast from "../../Component/LoadingError/Toast";
import * as JobService from "../../service/JobService";
import { useQuery } from "react-query";
import Header from "../Header";
import { useMutationHooks } from "../../hooks/useMutationHook";
function Update() {
  const { id } = useParams();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [design, setDesign] = useState([]);
  const [status, setStatus] = useState("");
  const toggleChecked = () => setShow((value) => !value);
  const clickMobi = () => setOpen((value) => !value);
  const userLogin = useSelector((state) => state.user);
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
  const handleGetDetailJob = async (id) => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));

    const res = await JobService.getDetail(id, access_token);
    // dispatch(createHistory(res));
    return res;
  };
  const { isLoading, data } = useQuery(["productDetail"], () =>
    handleGetDetailJob(id)
  );
  useEffect(() => {
    if (data) {
      setMessage(data.attributes.outsource_note);
      setStatus(data.status);
      setDesign(data.designs);
    }
  }, [data]);

  const handleFileInputChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setDesign(selectedImages);
  };
  const mutation = useMutationHooks(async (data) => {
    const { id, access_token, ...rests } = data;
    await JobService.updateJob(id, rests, access_token);
  });
  const submitHandler = async (e) => {
    e.preventDefault();

    if (message === "") {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(
          "Không được để trống Message",
          Toastobjects
        );
      }
    } else {
      const uploadedImageUrls = [];

      try {
        for (const image of design) {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", "Project1");

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dgeeyhyzq/image/upload`,
            formData
          );
          uploadedImageUrls.push({ url: response.data.secure_url });
        }
      } catch (error) {
        console.log(error);
      }
      // axios
      //   .put(`http://localhost:5000/api/v1/job/update/other/${id}`, {
      //     status: status,
      //     outsource_note: message,
      //     designs: uploadedImageUrls,
      //   })
      //   .then((res) => {
      //     toastId.current = toast.success("Thành công!", Toastobjects);
      //     // setTimeout(() => {
      //     //   window.location.reload();
      //     // }, 1000);
      //   })
      //   .catch((error) => {
      //     if (error.response.status === 500) {
      //       toastId.current = toast.error(
      //         "Có lỗi về server báo cho admin!",
      //         Toastobjects
      //       );
      //     } else {
      //       toastId.current = toast.error(
      //         error.response.data.message,
      //         Toastobjects
      //       );
      //     }
      //   });
      const access_token = JSON.parse(localStorage.getItem("access_token"));

      mutation.mutate({
        id,
        status: status,
        outsource_note: message,
        designs: uploadedImageUrls,
        access_token,
      });
    }
  };
  const { error, isSuccess } = mutation;

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
  return (
    <>
      <Toast />
      <Header />
      {/* <div className={open ? "left-side-bar open" : "left-side-bar"}>
        <div className="brand-logo">
          <Link to="/">
            <img
              class="h-10 w-auto"
              src={logo}
              alt="Your Company"
              style={{ maxWidth: "60px" }}
            />
          </Link>
          <div className="close-sidebar">
            <i class="fa-sharp fa-solid fa-xmark" onClick={clickMobi}></i>
          </div>
        </div>
        <div
          className={
            "menu-block customscroll mCustomScrollbar _mCS_2 scrollbox"
          }
        >
          <div
            className="mCustomScrollBox mCS-dark-2 mCSB_vertical mCSB_inside"
            style={{ maxHeight: "none" }}
          >
            <div
              className="sidebar-menu icon-style-1 icon-list-style-1"
              style={{ overflowY: "auto", height: "650px" }}
            >
              <ul className="accordion-menu">
                <li>
                  <a class="dropdown-toggle no-arrow">
                    <i class=" micon fas fa-light fa-money-bill "></i>
                    <span class="mtext">
                      Số Dư: <b>{formattedAmount(userLogin.money)} đ</b>
                    </span>
                  </a>
                </li>
                <li>
                  <a class="dropdown-toggle no-arrow">
                    <i class=" micon fas fa-light fa-calendar-days "></i>
                    <span class="mtext">
                      Đơn đã làm: <b>{userLogin.count} đơn</b>
                    </span>
                  </a>
                </li>
                <li>
                  <div class="dropdown-divider"></div>
                </li>

                <li>
                  <div class="sidebar-small-cap">Dịch vụ</div>
                </li>
                <li>
                  <Link class="dropdown-toggle no-arrow" to="/">
                    <i class="micon fa-solid fa-link"></i>
                    <span class="mtext">Danh sách đơn hàng</span>
                  </Link>
                </li>
                <li>
                  <Link class="dropdown-toggle no-arrow" to="/order">
                    <i class=" micon fas fa-solid fa-font-awesome "></i>
                    <span class="mtext">Đơn hàng đã nhận</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
      <div className="main-container1">
        <div className="pd-ltr-20 xs-pd-20-10">
          <div className="min-h-[200px]">
            <div className="page-header">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="tilte">
                    <h4>Edit Đơn Hàng</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-box mb-[30px]">
              <div className="p-5"></div>
              <div className="pb-5 table-responsive px-5">
                <div className="col-lg-8 col-md-6 col-sm-12 mb-[30px]">
                  <div className=" pt-[10px] h-full ">
                    <h2 className="mb-[30px] h4">CHI TIẾT</h2>
                    <form onSubmit={submitHandler}>
                      <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">
                          Note outsource:
                        </label>
                        <div className="col-sm-12 col-md-10">
                          <Textarea
                            label="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">
                          Design
                        </label>
                        <div className="col-sm-12 col-md-10">
                          <input
                            class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                            type="file"
                            onChange={handleFileInputChange}
                            id="formFileMultiple"
                            multiple
                          />
                        </div>
                      </div>
                      <div className="form-group row ">
                        <label className="col-sm-12 col-md-2 col-form-label">
                          Status
                        </label>
                        <div className=" px-[15px]">
                          <Select
                            label="Select Status"
                            success
                            onChange={(e) => setStatus(e)}
                          >
                            <Option value="Doing">Doing</Option>
                            <Option value="Review">Review</Option>
                          </Select>
                        </div>
                      </div>
                      <div className="px-[15px]">
                        <button
                          type="submit"
                          className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          <i className="fa-solid fa-print mr-2"></i>
                          Lưu Ngay
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Update;
