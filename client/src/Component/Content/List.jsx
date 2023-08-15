import React, { useEffect, useState } from "react";
import TableV2 from "../Table/TableV2";
import TableV3 from "../Table/TableV3";
import Datepicker from "react-tailwindcss-datepicker";

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
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentDateString = currentDate.toISOString().split('T')[0];

  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(currentDate.getFullYear(), currentMonth + 1, 0) // Ngày kết thúc của tháng hiện tại
  });

  const handleValueChange = newValue => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  const calculateShortcuts = () => {
    const yesterday = new Date();
    yesterday.setDate(currentDate.getDate() - 1);
    const yesterdayDateString = yesterday.toISOString().split('T')[0];

    const next8Days = new Date();
    next8Days.setDate(currentDate.getDate() + 8);
    const next8DaysDateString = next8Days.toISOString().split('T')[0];

    return {
      last3Days: {
        text: "Last 3 days",
        period: {
          start: yesterdayDateString,
          end: currentDateString
        },
      },
      yesterday: {
        text: "Yesterday",
        period: {
          start: yesterdayDateString,
          end: yesterdayDateString
        },
      },
      customToday: {
        text: "Custom Today",
        period: {
          start: currentDateString,
          end: currentDateString
        },
      },
      next8Days: {
        text: "Next 8 days",
        period: {
          start: currentDateString,
          end: next8DaysDateString
        },
      }
    };
  };
  return (
    <div className="min-h-[200px]">
      <div className="page-header">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="tilte">
              <h4>Thông tin user</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="card-box mb-[30px]">
        <div className="p-5">
          <Datepicker
            showShortcuts={true}
            configs={{
              shortcuts: calculateShortcuts()
            }}
            value={value} onChange={handleValueChange} />

        </div>
        <div className="pb-5 table-responsive px-5 pt-2 ">
          <TableV2 date={value} />
        </div>
      </div>
    </div>
  );
}

export default List;
