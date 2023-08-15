import React from "react";
import Header from "../../Component/Header";
import Sidebar from "../../Component/sidebar";
import EditUser from "../../Component/User/EditUser";

const EditUserPage = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        < EditUser/>
      </main>
    </>
  );
};

export default EditUserPage;
