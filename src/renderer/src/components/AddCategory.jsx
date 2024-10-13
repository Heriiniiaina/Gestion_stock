import { Button, TextField } from '@mui/material'
import React,{useEffect, useState} from 'react'

export default function AddCategory({modalAddCat,setModalAddCat}) {

  const [nom,setNom] = useState("")

  const updateProduct = (e)=>{
        e.preventDefault()
        console.log(nom)
    }
   
  return (
    <form action="" onSubmit={updateProduct} className='flex relative flex-col w-full gap-5 bg-gray-200 p-4 rounded-md shadow-md shadow-black'>
        <button onClick={()=>setModalAddCat(false)} className='relative justify-end flex'>X</button>
        <TextField onChange={(e)=>setNom(e.target.value)  } label="Nom du categorie"/>
       
        <div className="btn flex items-center gap-6">
            <Button sx={{ backgroundColor: "#0e0e0e" }} type="submit" variant='contained'>Ajouter</Button>
            <Button onClick={()=>setModalAddCat(false)} sx={{outline:"black", color:"black", borderColor:"black"}}>Annuler</Button>
        </div>
    </form>
  )
}
