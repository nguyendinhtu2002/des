import React from "react";
import Header from "../../Component/Header";
import Sidebar from "../../Component/sidebar";
import EditProductMain from "../../Component/Main/EditProduct";

const EditProduct = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditProductMain />
      </main>
    </>
  );
};

export default EditProduct;
