import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../features/userSlide/userSlide";
// import * as UserService from "../Services/UserService";
// import { resetPay } from "../features/Order/Order";
// import { resetUser } from "../features/userSlide/userSlide";
// import { restProductSingle } from "../features/productSlide/ProductSliceNew";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  useEffect(() => {
    $("[data-trigger]").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var offcanvas_id = $(this).attr("data-trigger");
      $(offcanvas_id).toggleClass("show");
    });

    $(".btn-aside-minimize").on("click", function () {
      if (window.innerWidth < 768) {
        $("body").removeClass("aside-mini");
        $(".navbar-aside").removeClass("show");
      } else {
        // minimize sidebar on desktop
        $("body").toggleClass("aside-mini");
      }
    });
  }, []);

  const logoutHandler = async () => {
    dispatch(resetUser());
    localStorage.clear("access_token");
    localStorage.clear("refresh_token");
    window.location.reload();
  };
  const options = {
    maximumFractionDigits: 0,
  };
  const formattedAmount = (amount, options) => {
    return amount.toLocaleString(undefined, options);
  };
  return (
    <header className="main-header navbar">
      <div className="col-search"></div>
      <div className="col-nav">
        <button
          class="btn btn-icon btn-mobile me-auto"
          data-trigger="#offcanvas_aside"
        >
          <i class="md-28 fas fa-bars"></i>
        </button>
        <ul className="nav">
          <li className="nav-item mr-2">
            <span>Số dư: {formattedAmount(userLogin.money)} VND</span>
          </li>

          <li className="dropdown nav-item">
            <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
              <img
                className="img-xs rounded-circle"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="User"
              />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link className="dropdown-item" to="/">
                My profile
              </Link>
              <Link className="dropdown-item" to="#">
                Settings
              </Link>
              <Link
                onClick={logoutHandler}
                className="dropdown-item text-danger"
                to="#"
              >
                Exit
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
