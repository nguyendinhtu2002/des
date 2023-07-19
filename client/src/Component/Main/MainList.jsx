import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import List from "../Content/List";
import { useSelector } from "react-redux";
import Header from "../Header";

const usePathName = () => {
  const location = useLocation();
  return location.pathname;
};
const MainList = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const handleBurgerClick = () => {
    setMenuOpen(!isMenuOpen);
  };
  const userLogin = useSelector((state) => state.user);

  const location = usePathName();
  const handleCloseClick = () => {
    setMenuOpen(false);
  };
  const toggleChecked = () => setShow((value) => !value);
  const clickMobi = () => setOpen((value) => !value);
  const options = {
    maximumFractionDigits: 0,
  };
  const formattedAmount = (amount, options) => {
    return amount.toLocaleString(undefined, options);
  };
  return (
    <>
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
          <List />
        </div>
      </div>
    </>
  );
};

export default MainList;
