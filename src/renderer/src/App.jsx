import { useState } from 'react'

import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import AddProduct from './Pages/AddProduct'
import ListProduct from './Pages/ListProduct'
import Home from './Pages/Home'
import Logout from './Pages/Logout'
import Customers from './Pages/Customers'
import AddCustomer from './Pages/AddCustomer'

function App() {
  
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={<Home/>}>
                <Route path='addProduct' element={<AddProduct/>}/>
                <Route path='listProduct' element={<ListProduct/>}/>
                <Route path='dashboard' element={<Dashboard/>}/>
                <Route path='' element={<Dashboard/>}/>
                <Route path='customers' element={<Customers/>} />
                <Route path='addCustomers' element={<AddCustomer/>} />
            </Route>
            <Route path='/logout' element={<Logout/>}/>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App


