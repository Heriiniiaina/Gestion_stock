import React from 'react'
import { FaFirstOrderAlt, FaHome, FaJediOrder, FaProductHunt, FaShopify, FaShoppingBag, FaUserAlt } from "react-icons/fa"
import { BiSolidShoppingBagAlt } from "react-icons/bi"
import { Link } from 'react-router-dom'
export default function NavBar() {
  return (
    <div className='flex flex-col gap-y-10 py-5 h-screen w-full bg-blue-600'>
        <div className='logo'>
            <h1 className='text-4xl text-black bg-white py-4'>Stockeo</h1>
        </div>
        <div className='navbar px-4 '>
            <ul className='flex flex-col text-white justify-center gap-y-5'>
                <li className='text-2xl '><Link className='flex items-center gap-2' ><FaHome/> Dashboard</Link> </li>
                <li className='text-2xl '><Link className='flex items-center gap-2' ><FaProductHunt/> Product</Link> </li>
                <li className='text-2xl '><Link className='flex items-center gap-2'><FaUserAlt/> Client</Link> </li>
                <li className='text-2xl '><Link className='flex items-center gap-2'><BiSolidShoppingBagAlt/> Orders</Link> </li> 
            </ul>
        </div>
    </div>
  )
}
