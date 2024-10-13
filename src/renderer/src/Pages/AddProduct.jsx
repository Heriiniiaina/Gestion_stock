import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function AddProduct() {
    const [nom,setNom] = useState("")
    const [designation,setDesignation] = useState("")
    const [category,setCategory] = useState("")
    const [prix,setPrix] = useState("")
    const [stock,setStock] = useState("")
    const [listCategory,setListCategory] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8000/category/getAllCategory')
            setListCategory(response.data.category);
           
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    const addProduct = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/product/addProduct",{nom,prix,designation,category,stock}).then(res=>{
            toast.success(res.data.message)
            setPrix("")
            setCategory("")
            setDesignation("")
            setNom("")
            setStock("")
        }).catch(err=>{
            console.log(err)
        })
    }
    
      console.log(listCategory)
  return (
    <div className='flex flex-col items-center justify-center w-full p-3 gap-8'>
        <h2 className='text-3xl'>Ajouter un produit</h2>
        <form action="" onSubmit={addProduct} className='text-white flex flex-col items-center justify-center gap-8'>
            <TextField label="Nom du produit" value={nom} onChange={e=>setNom(e.target.value)} variant="outlined" required/>
            <TextField label="Désignation" value={designation} onChange={e=>setDesignation(e.target.value)}   variant="outlined" required/>
            <FormControl>
                <Select>
                    {
                        listCategory?.map((cat,index)=>(
                            <MenuItem key={index} value={cat.nom}>{cat.nom}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <TextField label="Prix unitaire" value={prix} onChange={e=>setPrix(e.target.value)}  type='number'  variant="outlined" required/>
            <TextField label="Stock Disponible" value={stock} onChange={e=>setStock(e.target.value)}  type='number'  variant="outlined" required/>
            <Button type='submit' sx={{backgroundColor:"#0e0e0e",color:"white"}} variant="outlined">Ajouter</Button>
        </form>
    </div>
  )
}
