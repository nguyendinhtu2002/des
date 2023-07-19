import React, { useEffect, useState } from "react";
import TopTotal from "./TopTotal";
import SaleStatistics from "./SalesStatistic";
import ProductsStatistics from "./ProductsStatistics";
// import { useDispatch, useSelector } from "react-redux";
// import * as ProductService from "../../Services/ProductService";
// import { useQuery } from "react-query";
// import * as PayService from "../../Services/OrderSevice";
import * as JobService from "../../service/JobService";
import * as UserService from "../../service/UserService";
const Main = () => {
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>
        {/* Top Total */}
        <TopTotal  />

        <div className="row">
          {/* STATICS */}
          <SaleStatistics />
          <ProductsStatistics />
        </div>

        {/* LATEST ORDER */}
        {/* <div className="card mb-4 shadow-sm">
        </div> */}
      </section>
    </>
  );
};

export default Main;
