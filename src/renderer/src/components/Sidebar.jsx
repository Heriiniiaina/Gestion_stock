import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart,FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { createContext, useContext} from "react"
import { BiAddToQueue, BiCategory } from "react-icons/bi";
import { LogOut } from "lucide-react";

import Logo from "../assets/logo1.png"

export default function Sidebar() {
    const menus = [
        { name: "Dashboard", link: "/home/dashboard", icon: MdOutlineDashboard },
        { name: "Client", link: "/home/customers", icon: AiOutlineUser },
        {name:  "Ajout client", link:"/home/AddCustomers", icon:FiUserPlus},
        { name: "Ajout produits", link: "/home/addProduct", icon: BiAddToQueue},
        { name: "Liste Produits", link: "/home/listProduct", icon: FiFolder },
         {name:"Categorie", link: "/home/category",icon: BiCategory},
        { name: "Achat", link: "/home/purchase", icon: FiShoppingCart },
        { name: "Déconnecter", link: "/logout", icon: LogOut },
      ];
      const [open, setOpen] = useState(true);
    return (
        <>
      
           <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-52" : "w-20"
        } duration-500 text-gray-100 p-4`}
      >
        <div className="flex items-center g-4">
          <div className={open ? "block" : "none opacity-0"} >
              <img  width={"150px"} src={Logo} alt="" />
          </div>
          <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={30}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        </div>
       
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "25" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
        </>
    )
}

export function SidebarItem({ icon, text, active, alert }) {
    const { expanded } = useContext(SidebarContext)
    return (
        <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}>
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>

                </div>
            )}

            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </li>
    )
}