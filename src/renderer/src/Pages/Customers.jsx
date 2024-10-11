import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import * as XLSX from "xlsx"
import e from 'cors';
const Customers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm,setSearchTerm] = useState("")
  const [copyData,setCopyData] = useState([])
  const [exportData,setExportData] = useState([]) 
  //const [filterDate,setFilterData] = useState("")
  useEffect(() => {
    setSearchTerm("");
    setCopyData(data); 
  }, [data]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/client/getAllClient');
        setData(response.data.clients)
        setCopyData(data)
       setExportData(data.map(e=>({
        nom:e.nom,
        prenom:e.prenom,
        telephone:e.telephone,
        email:e.email
       })))
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const exportToExcel = (e)=>{
    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook,worksheet,"Produits")
    XLSX.writeFile(workbook,"ListeClient.xlsx")
  }

  const handleSearch = (e)=>{
      setSearchTerm(e.target.value)
      const filteredData = data.filter((item) => 
        item.nom.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.prenom.toLowerCase().includes(e.target.value.toLowerCase())
      );
      
      setCopyData(filteredData);
  }

 
 
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='flex flex-col items-center justify-center'>
      <div>
         <h2 className='text-3xl'>Liste des produits</h2>
      </div>
      <div className='w-full flex flex-col gap-6'>
        <div className='flex justify-between w-full'>
        <TextField onChange={handleSearch} label="Rechercher un produit" />
        <div className='flex gap-4'>
          <Button sx={{backgroundColor:"#0e0e0e"}}  variant="contained" ><Link to={"/home/addCustomers"}>+ Ajouter un Client</Link></Button>
          <Button sx={{outline:"black", color:"black", borderColor:"black"}} onClick={()=>exportToExcel()} variant="outlined">Export to excel</Button>

        </div>
        </div>
       
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '5px' }}>Nom</th>
            <th style={{ border: '1px solid #ddd', padding: '5px' }}>Prenom</th>
            <th style={{ border: '1px solid #ddd', padding: '5px' }}>Telephone</th>
            <th style={{ border: '1px solid #ddd', padding: '5px' }}>Email</th>
          
          </tr>
        </thead>
        <tbody>
          {copyData.map((item,index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '5px' }}>{item.nom}</td>
              <td style={{ border: '1px solid #ddd', padding: '5px' }}>{item.prenom}</td>
              <td style={{ border: '1px solid #ddd', padding: '5px' }}>{item.telephone}</td>
              <td style={{ border: '1px solid #ddd', padding: '5px' }}>{item.email}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
      </div>
     
    </div>
  );
};

export default Customers;
