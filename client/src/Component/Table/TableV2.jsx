import React, { useEffect, useState } from "react";
import {
  Typography,
  Card
} from "@material-tailwind/react";
import * as JobService from "../../service/JobService";
import { useQuery } from "react-query";
import Loading from "../LoadingError/Loading";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../../Component/LoadingError/Toast";

function TableV2(date) {
  const test = date;
  const TABLE_HEAD = ["#", "Tên nhân viên", "Chi tiết doanh thu", "Tổng doanh thu"];
  const TABLE_ROWS = [
    {
      id: 1,
      name: "John Michael",
      job: "Manager",
      date: "23/04/18",
    },
  ];
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
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11)
  });
  const {id} = useSelector((state)=>state.user)
  const handleValueChange = newValue => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  const fetchJob = async () => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));

    const res = await JobService.getJobUser(id,access_token);
    return res;
  };
  const options = {
    maximumFractionDigits: 0,
  };
  const formattedAmount = (amount, options) => {
    return amount.toLocaleString(undefined, options);
  };
  const userLogin = useSelector((state) => state.user);
  const { isLoading, data } = useQuery(["products"], fetchJob);
  const mutation = useMutationHooks(async (data) => {
    const { id, access_token, ...rests } = data;
    await JobService.addUsertoJob(id, rests, access_token);
  });
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
      {/* <div className="table-filter col-md-12">
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
                Tên nhân viên
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
                Chi tiết doanh thu
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
                Tổng doanh thu
              </th>

            </tr>
          </thead>
          <tbody className="text-[13px]">
            <tr className="outline-0 ">
              <td className="border-r border-b">1</td>
              <td className="p-0 ml-1 border-r border-b">
                
                <span>Nguyễn Đình Tư</span>
              
    
              </td>
              <td className="p-0 ml-1 border-r items-start border-b">
                <div className="max-w-[500px] max-h-[250px] py-0 px-[10px] flex flex-wrap  items-start mt-2my-[5px]  overflow-y-scroll mb-[200px]"></div>
              </td>
              <td className="p-0 ml-1 border-r border-b ">
              
              </td>
            
            </tr>
          </tbody>
        </table>
      </div> */}
      
      <Card className="h-full w-full overflow-scroll "  >
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data["transformedData"]?.map(({ designer_id, product }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {index+1}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {designer_id.name}
                    </Typography>
                  </td>
                  <td className={classes}>

                    {product.map((item)=><div className="flex items-center">
                      <Typography
                        variant="body1"
                        color="blueGray" // Tailwind CSS color class
                        className="font-normal mr-2"
                      >
                        {item.nameProduct} - {item.quantity} :
                      </Typography>
                      <Typography color="green" variant="body1">
                        {formattedAmount(item.money)}
                      </Typography>
                    </div>
                    )}
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="green"
                      className="font-normal"
                    >
                      {formattedAmount(data["totalMoney"])}
                    </Typography>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}

export default TableV2;
