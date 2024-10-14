import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import * as XLSX from "xlsx"
import UpdateProduct from '../components/UpdateProduct';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Tri from '../components/Tri';
import AddCategory from '../components/AddCategory';
import toast from 'react-hot-toast';
import {confirmAlert} from "react-confirm-alert"
import 'react-confirm-alert/src/react-confirm-alert.css'; 
const Category = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm,setSearchTerm] = useState("")
  const [copyData,setCopyData] = useState([])
  const [modal,setModal] = useState(false)
  const [productData,setProductData] = useState({})
  const [modalAddCat,setModalAddCat] = useState(false)
  useEffect(() => {
    setSearchTerm("");
    setCopyData(data); 
  }, [data]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/category/getAllCategory')
        setData(response.data.category);
        setCopyData(data)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleSearch = (e)=>{
      setSearchTerm(e.target.value)
      const filteredData = data.filter((item) => 
        item.categoryName.toLowerCase().includes(e.target.value.toLowerCase()) 
      
      );
      
      setCopyData(filteredData);
  }
  const deleteCategory = (id)=>{
     axios.delete(`http://localhost:8000/category/delete/${id}`).then(res=>{
      console.log(res)
      toast.success(res.data.message)
      window.location.reload()
     }).catch(err=>{
      console.log(err)
     })
  }
 
  const handleDeleteClick = (id) => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Voulez vous supprimer cette catégorie ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteCategory(id)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
    
  };
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
          <Button sx={{backgroundColor:"#0e0e0e"}} onClick={()=>setModalAddCat(true)} variant="contained" >+ Ajouter un categorie</Button>
          
        </div>
        </div>
       
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '5px' }}>Catégorie</th>
            <th style={{ border: '1px solid #ddd', padding: '5px' }}>Options</th>
          </tr>
        </thead>
        <tbody>
          {copyData.map((item,index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '5px' }}>{item.categoryName}</td>
      
              <td className='' style={{ border: '1px solid #ddd', padding: '5px' }}>
                <div className='flex justify-center gap-3'>
                  <button onClick={()=>{
                    setModal(true)
                    setProductData(item)
                  }}><FaEdit/> </button>
                  <button onClick={()=>handleDeleteClick(item._id)}><FaTrash/> </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className={modal ? "absolute top-1/4" :"opacity-0" }>
          <UpdateProduct modal={modal} setModal={setModal} productData={productData}/>
      </div>
      <div className={modalAddCat ? "absolute top-1/4" :"opacity-0" }>
          <AddCategory modalAddCat={modalAddCat} setModalAddCat={setModalAddCat}/>
      </div>
    </div>
  );
};

export default Category;
