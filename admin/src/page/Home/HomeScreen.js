import React from "react";
import Header from "../../Component/Header";
import Main from "../../Component/Home/Main";
import Sidebar from "../../Component/sidebar";

const HomeScreen = () => {
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

export default HomeScreen;