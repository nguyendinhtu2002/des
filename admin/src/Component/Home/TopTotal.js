import React, { useEffect, useState } from "react";
import Loading from "../LoadingError/LoadingError";
import * as JobService from "../../service/JobService";
import * as UserService from "../../service/UserService";
import { useQuery } from "react-query";
const TopTotal = (props) => {
  const [job, setJob] = useState([]);
  const [user, setUser] = useState([]);
  const [totalCustomer, setTotalCustomer] = useState([]);

  const fetchJob = async () => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    const res = await JobService.getTotalPrice(access_token);

    return res;
  };
  const fetchTotalMoney = async () => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    const res = await UserService.getToatalMoneyCustomer(access_token);

    return res;
  };
  const fetchTotalUser = async () => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    const res = await UserService.getUserByCustomer();

    return res;
  };
  const fetchTotalGuest = async () => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    const res = await UserService.getAllGuest();

    return res;
  };
  const { isLoading, data } = useQuery(["products"], fetchJob);
  const { isLoading1: isLoading1, data: data1 } = useQuery(
    ["customer"],
    fetchTotalMoney
  );
  const { isLoading1: isLoading2, data: data2 } = useQuery(
    ["totalcustomer"],
    fetchTotalUser
  );
  const { isLoading1: isLoading3, data: data3 } = useQuery(
    ["guest"],
    fetchTotalGuest
  );
  // console.log(data2)
  // const hangldeGetAll = async () => {
  //   const access_token = JSON.parse(localStorage.getItem("access_token"));
  //   const res = await JobService.getTotalPrice(access_token);
  //   const resUser = await UserService.getToatalMoneyCustomer();
  //   const totalUser = await UserService.getUserByCustomer();
  //   setJob(res);
  //   setUser(resUser);
  //   setTotalCustomer(totalUser);

  //   // dispatch(updatePay(res));
  // };
  // useEffect(() => {
  //   hangldeGetAll();
  // }, []);

  const options = {
    maximumFractionDigits: 0,
  };
  const formattedAmount = (amount, options) => {
    return amount?.toLocaleString(undefined, options);
  };
  return (
    <div className="row">
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="text-primary fas fa-usd-circle"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng tiền của khách hàng</h6>
              {!isLoading ? (
                <span>$ {formattedAmount(data?.totalMoney)||0}</span>
              ) : (
                <Loading />
              )}{" "}
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-success">
              <i className="text-success fas fa-bags-shopping"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng tiền của nhân viên</h6>
              {!isLoading1 ? (
                <span>
                  ${" "}
                  {data1?.totalMoney.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              ) : (
                <Loading />
              )}{" "}
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-info">
              <i className="text-info fas fa-user"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Số lượng khách hàng</h6>
              {data3 ? <span>{data3.length}</span> : <span>0</span>}
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-info">
              <i className="text-info fas fa-user"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Số lượng nhân viên</h6>
              {!isLoading2 ? <span>{data2?.length}</span> : <Loading />}{" "}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default TopTotal;
