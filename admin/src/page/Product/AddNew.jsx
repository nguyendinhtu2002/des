import React from "react";
import Header from "../../Component/Header";
import Sidebar from "../../Component/sidebar";
import AddProductMain from "../../Component/Order/AddProduct";

const AddNew = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        < AddProductMain/>
      </main>
    </>
  );
};

export default AddNew;
