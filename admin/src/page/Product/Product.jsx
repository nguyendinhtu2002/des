import React from "react";
import Header from "../../Component/Header";
import Sidebar from "../../Component/sidebar";
import Main from "../../Component/Order/Main";

const ProductScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Main />
      </main>
    </>
  );
};

export default ProductScreen;