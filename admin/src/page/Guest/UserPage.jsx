import React from "react";
import Sidebar from "../../Component/sidebar";
import Header from "../../Component/Header";
import GuestMain from "../../Component/Guest/Usermain";
function GuestPage() {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <GuestMain />
      </main>
    </>
  );
}

export default GuestPage;
