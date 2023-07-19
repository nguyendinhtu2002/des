import React from "react";
import Sidebar from "../../Component/sidebar";
import Header from "../../Component/Header";
import UserMain from "../../Component/User/Usermain";
function UserPage() {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserMain />
      </main>
    </>
  );
}

export default UserPage;
