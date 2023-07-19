import React, { useEffect, useState } from "react";
import TableV2 from "../Table/TableV2";
import TableV3 from "../Table/TableV3";

function List() {
  const [tableType, setTableType] = useState("TableV3"); // Mặc định là TableV3

  useEffect(() => {
    // Kiểm tra URL để xác định loại bảng muốn hiển thị
    const url = window.location.pathname;
    if (url === "/list") {
      setTableType("TableV2");
    } else {
      setTableType("TableV3");
    }
  }, []);

  return (
    <div className="min-h-[200px]">
      <div className="page-header">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="tilte">
              <h4>Danh sách đơn hàng mới</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="card-box mb-[30px]">
        <div className="p-5"></div>
        <div className="pb-5 table-responsive px-5 pt-2">
          <TableV2 />
        </div>
      </div>
    </div>
  );
}

export default List;
