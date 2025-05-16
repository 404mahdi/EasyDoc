import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Pharma = () => {
  console.log("Pharma component rendered");
  
  return (
    <div className='app'>
      <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>}/>
      </Routes>
    </div>
  )
}

export default Pharma
