import React, { useEffect, useState } from "react";
import TableV2 from "../Table/TableV2";
import TableV3 from "../Table/TableV3";

function Order() {
  

  return (
    <div className="min-h-[200px]">
      <div className="page-header">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="tilte">
              <h4>Danh sách đơn hàng đã nhận</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="card-box mb-[30px]">
        <div className="p-5"></div>
        <div className="pb-5 table-responsive px-5 pt-2">
          <TableV3 />
        </div>
      </div>
    </div>
  );
}

export default Order;
