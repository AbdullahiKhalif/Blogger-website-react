import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import Header from './Components/Header'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className="max-w-6xl m-auto mt-20">
      <ToastContainer position='top-center' autoClose={2000} />
      <Header/>
      <Outlet/>
    </div>
  )
}

export default App