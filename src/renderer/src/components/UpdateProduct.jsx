import { Button, TextField } from '@mui/material'
import React,{useEffect, useState} from 'react'

export default function UpdateProduct({modal,setModal,productData}) {

  const [nom,setNom] = useState(productData.nom)
  const [designation,setDesignation] = useState(productData.designation)
  const [category,setCategory] = useState(productData.category)
  const [prix,setPrix] = useState(productData.prix)
  const [stock,setStock] = useState(productData.stock) 
  const updateProduct = (e)=>{
        e.preventDefault()
        console.log(nom)
    }
    useEffect(()=>{
      setNom(productData.nom)
    },[productData])
  console.log(productData.nom)
  return (
    <form action="" onSubmit={updateProduct} className='flex relative flex-col w-full gap-5 bg-gray-200 p-4 rounded-md shadow-md shadow-black'>
        <button onClick={()=>setModal(false)} className='relative justify-end flex'>X</button>
        <TextField onChange={(e)=>setNom(e.target.value)  } label="Nom" value={productData.nom}/>
        <TextField onChange={(e)=>setDesignation(e.target.value)  }   label="Designation" value={productData.designation}/>
        <TextField onChange={(e)=>setPrix(e.target.value)  }  label="Prix" value={productData.prix}/>
        <TextField onChange={(e)=>setCategory(e.target.value)  }  label="Categorie" value={productData.category}/>
        <TextField onChange={(e)=>setStock(e.target.value)  }  label="Stock" value={productData.stock}/>
        <div className="btn flex items-center gap-6">
            <Button sx={{ backgroundColor: "#0e0e0e" }} type="submit" variant='contained'>Mettre à jour</Button>
            <Button onClick={()=>setModal(false)} sx={{outline:"black", color:"black", borderColor:"black"}}>Annuler</Button>
        </div>
    </form>
  )
}
