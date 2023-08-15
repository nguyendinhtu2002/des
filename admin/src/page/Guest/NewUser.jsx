import React from 'react'
import Sidebar from '../../Component/sidebar'
import Header from '../../Component/Header'
import CreateUser from '../../Component/User/CreateUser'

function NewUser() {
  return (
    <>
    <Sidebar />
    <main className="main-wrap">
      <Header />
      < CreateUser/>
    </main>
  </>
  )
}

export default NewUser