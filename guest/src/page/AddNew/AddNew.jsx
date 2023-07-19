import React from "react";
import Sidebar from "../../Component/sidebar";
import Header from "../../Component/Header";
import AddProductMain from "../../Component/Main/AddProduct";
const AddNew = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddProductMain />
      </main>
    </>
  );
};

export default AddNew;
