import {User2} from "lucide-react"
import React, { useState,useEffect } from "react";
import { FaBox, FaClipboardList, FaCubes, FaUserFriends } from "react-icons/fa";
import productImage from "../assets/product.png"
import userImage from "../assets/team.png"
import axios from "axios";
const Dashboard = () => {
  const [products,setProducts] = useState([])
  const [clients,setClients] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
useEffect(() => {
  const fetchData = async () => {
    try {
      const produits = await axios.get('http://localhost:8000/product/getAllProduct'); 
      setProducts(produits.data.products);
      const customers = await axios.get('http://localhost:8000/client/getAllClient');
      setClients(customers.data.clients)
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
console.log(products)
  return (
    <div className="flex flex-wrap gap-7 justify-center items-center p-6">
        <div className="flex flex-col items-center h-[200px] w-[300px] bg-black text-white">
              <img width={"100px"}  src={productImage} alt="" />
              <h4>{products.length}</h4> 
              <p>Total Produits</p>
        </div>
        <div className="flex flex-col items-center bg-black text-white h-[200px] w-[300px]">
              <img width={"100px"} src={userImage} alt="" />
              <h4>{clients.length}</h4> 
              <p>Total Client</p>
        </div>
        

    </div>
  );
};

export default Dashboard