import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import List from "../Content/List";
import { useSelector } from "react-redux";
import Header from "../Header";
import Datepicker from "react-tailwindcss-datepicker";

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
     
      <div className="main-container1">
        <div className="pd-ltr-20 xs-pd-20-10 h-[500px]">
          <List />
        </div>
      </div>
    </>
  );
};

export default MainList;
