import React, { useEffect, useState } from "react";
import { BorderTop } from "@mui/icons-material";
import {
  Avatar,
  Checkbox,
  Select,
  Option,
  Typography,
  Input,
  Textarea,
  Button,
} from "@material-tailwind/react";
// import { Input } from "@mui/material";
import * as JobService from "../../service/JobService";
import { useQuery } from "react-query";
import Loading from "../LoadingError/Loading";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../../Component/LoadingError/Toast";
import axios from "axios";
import moment from "moment";
function TableV2() {
  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const [Issuccess, setSuccess] = useState(false);
  const [Iserror, setError] = useState(false);
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
  const handleNoteDoubleClick = () => {
    setIsNoteVisible(true);
  };
  const fetchJob = async () => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));

    const res = await JobService.getAllJob(access_token);
    return res;
  };
  const userLogin = useSelector((state) => state.user);
  const { isLoading, data } = useQuery(["products"], fetchJob);
  const mutation = useMutationHooks(async (data) => {
    const { id, access_token, ...rests } = data;
    await JobService.addUsertoJob(id, rests, access_token);
  });
  const { error, isSuccess } = mutation;

  const submitHandler = async (id) => {
    // axios
    //   .post(`http://localhost:5000/api/v1/job/addUsertoJob/${id}`, {
    //     designerId: userLogin.id,
    //   })
    //   .then((res) => {
    //     setSuccess(true);
    //     toastId.current = toast.success("Thành công!", Toastobjects);
    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 3000);
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
      id: id,
      designerId: userLogin.id,
      access_token,
    });
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
          "Đã có người nhận job này rồi vui lòng ấn F5",
          Toastobjects
        );
      }
    }
  }, [error, isSuccess]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Toast />
      <div className="table-filter col-md-12">
        <table className="table border border-solid border-[#f4f4f4] w-full h-full mb-5  text-sm font-light dark:border-neutral-500">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr id="js-table-head">
              <th
                style={{
                  width: "5px",
                  BorderTop: "0px",
                  borderBottomWidth: "2px",
                  border: "1px solid #f4f4f4",
                  paddingLeft: "0px",
                }}
                className="border-r py-2 "
              >
                #
              </th>
              <th
                style={{
                  width: "35%",
                  borderTop: "0px",
                  borderBottomWidth: "2px",
                  border: "1px solid #f4f4f4",
                  paddingLeft: "0px",
                }}
                className="border-r py-2 "
              >
                Product
              </th>
              <th
                style={{
                  width: "35%",
                  borderTop: "0px",
                  borderBottomWidth: "2px",
                  border: "1px solid #f4f4f4",
                  paddingLeft: "0px",
                }}
                className="border-r py-2 "
              >
                Design
              </th>
              <th
                style={{
                  width: "20%",
                  borderTop: "0px",
                  borderBottomWidth: "2px",
                  border: "1px solid #f4f4f4",
                  paddingLeft: "0px",
                }}
                className="border-r py-2 "
              >
                Designer
              </th>
              <th
                style={{
                  width: "15%",
                  borderTop: "0px",
                  borderBottomWidth: "2px",
                  border: "1px solid #f4f4f4",
                  paddingLeft: "0px",
                }}
                className="border-r py-2 "
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {data?.map((item) => (
              <tr className="outline-0 ">
                <td className="border-r border-b">{item.id}</td>
                <td className="p-0 ml-1 border-r border-b">
                  <div className="pl-2 pt-2">
                    <img
                      className="ng-scope h-5 w-[30px] cursor-default inline"
                      src="https://printerval.com/system/images/flags/png100px/de.png"
                    />
                    <a className="text-[#3c8dbc]">
                      <h5 class="ng-binding inline text-[#3c8dbc] ml-1 ">
                        {moment(item.product.name).format("YYYY-MM-DD HH:mm:ss.SSS")}
                      </h5>
                    </a>
                  </div>

                  <div className="mt-[0.5px] pl-2">
                    <strong>Created at:</strong>
                    <span class="ng-binding"> {item.createdAt}</span>
                  </div>
                  <div className=" pl-2">
                    <strong>Deadline at:</strong>
                    <span class="ng-binding text-[#a94442]">
                      {" "}
                      {moment(item.product.Deadline).format(
                        "YYYY-MM-DD HH:mm:ss.SSS"
                      )}
                    </span>
                  </div>
                  <div className="flex flex-wrap max-h-[200px]  overflow-y-scroll pl-2">
                    {item.product.size.map((temp, index) => (
                      <div
                        key={index}
                        className="p-[5px] mb-[10px] mr-[5px] border border-solid border-[#ddd] rounded-lg w-[160px]"
                      >
                        <a className="">
                          <Avatar
                            src="https://cdn.prtvstatic.com/unsafe/600x0/assets.printerval.com/2023/05/17/646474149ef240.11658332.jpg"
                            size="lg"
                            alt="avatar"
                          />
                        </a>
                        <div className="inline-block align-middle">
                          <strong className="ng-binding">
                            {item.product.sku}{" "}
                          </strong>
                          <div className="ng-scope">
                            <strong>Size: </strong>
                            <span className="ng-binding"> {temp}</span>
                          </div>
                          <div className="ng-scope">
                            <strong>Color: </strong>
                            <span className="ng-binding"> Dark Heather</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="p-0 ml-1 border-r items-start border-b">
                  <div className="max-w-[500px] max-h-[250px] py-0 px-[10px] flex flex-wrap  items-start mt-2my-[5px]  overflow-y-scroll mb-[200px]"></div>
                </td>
                <td className="p-0 ml-1 border-r border-b ">
                  <div class="form-group mx-2">
                    <Input label="Chưa ai nhận" disabled />
                  </div>
                  <div class="form-group mx-2">
                    <Input label="Nguyễn Văn A" disabled />
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
                      // onDoubleClick={handleNoteDoubleClick}
                      aria-hidden={!isNoteVisible}
                    >
                      {isNoteVisible ? null : "Double click here to note!"}
                    </div>
                    {isNoteVisible && <Textarea label="Message" />}
                    {isNoteVisible && (
                      <Button
                        size="sm"
                        className="rounded-md"
                        onClick={() => setIsNoteVisible(false)}
                      >
                        Save
                      </Button>
                    )}
                  </div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className=" font-medium mx-4 mt-2"
                  >
                    Lương:
                  </Typography>
                  <div className="relative flex mx-2 mt-2">
                    <Input
                      type="email"
                      label="Email Address"
                      value={200}
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
                </td>
                <td className="p-0 ml-1 border-r border-b ">
                  <div className="mx-2">
                    <Input label="Waiting" disabled />
                    <Button
                      size="sm"
                      // color={email ? "blue" : "blue-gray"}
                      // disabled={!email}
                      // disabled
                      onClick={(e) => {
                        submitHandler(item.id);
                      }}
                      className="mt-2"
                    >
                      Nhận job
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableV2;
