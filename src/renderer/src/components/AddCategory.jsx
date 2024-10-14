import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React,{useEffect, useState} from 'react'
import {toast} from "react-hot-toast"
export default function AddCategory({modalAddCat,setModalAddCat}) {

  const [nom,setNom] = useState("")
  
  const addCategory = (e)=>{
        e.preventDefault()
        
          axios.post("http://localhost:8000/category/addCategory",{nom}).then(res=>{
            toast.success(res.data.message)
            setModalAddCat(false)
            window.location.reload()
          }).catch(err=>{
            toast.error(err.response.data.message)
          })
        
        }
  return (
    <form action="" onSubmit={addCategory} className='flex relative flex-col w-full gap-5 bg-gray-200 p-4 rounded-md shadow-md shadow-black'>
        <button onClick={()=>setModalAddCat(false)} className='relative justify-end flex'>X</button>
        <TextField onChange={(e)=>setNom(e.target.value)  } label="Nom du categorie"/>
       
        <div className="btn flex items-center gap-6">
            <Button sx={{ backgroundColor: "#0e0e0e" }} type="submit" variant='contained'>Ajouter</Button>
            <Button onClick={()=>setModalAddCat(false)} sx={{outline:"black", color:"black", borderColor:"black"}}>Annuler</Button>
        </div>
    </form>
  )
}
