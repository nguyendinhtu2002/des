import React, { useEffect, useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import { useSelector } from "react-redux";
import * as UserService from "../../service/UserService";
import { error } from "jquery";
import Users from "./User";
import { Link } from "react-router-dom";
const GuestMain = () => {
  //   const orderList = useSelector((state) => state.orderList);
  //   const { loading, error, orders } = orderList;
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [tempData, setTempData] = useState([]);
  const [search, SetSearch] = useState("");

  const hangldeGetAll = async (access_token) => {
    setLoading(true);
    await UserService.getAllGuest(access_token)
      .then((res) => {
        setLoading(false);
        setTempData(res);
      })
      .catch((error) => {
        setError(error);
      });

  };
  useEffect(() => {
    if (search === "") {
      const access_token = localStorage.getItem("access_token");

      hangldeGetAll(JSON.parse(access_token));
    } else {
      const result = tempData.filter((product) => {
        const values = Object.values(product).join().toLowerCase();
        return values.includes(search.toLowerCase());
      });
      setTempData(result);
    }
  }, [search]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title ">Products</h2>
         <div>
          <Link to="/addUser" className="btn btn-primary">
            Create new
          </Link>
        </div> 
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Users data={tempData} search={search} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestMain;
