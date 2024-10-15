import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React,{useEffect, useState} from 'react'
import toast from 'react-hot-toast'

export default function UpdateCustomer({modal,setModal,productData}) {

  const [nom,setNom] = useState(productData.nom || "")
  const [prenom,setPrenom] = useState(productData.prenom || "")
  const [email,setEmail] = useState(productData.email || "")
  const [telephone,setTelephone] = useState(productData.telephone || "")
 
  const updateProduct = (e)=>{
        e.preventDefault()
        const id = productData._id
        axios.put(`http://localhost:8000/client/update/${id}`,{nom,prenom,email,telephone}).then(res=>{
          toast.success(res.data.message)
          window.location.reload()
        }).catch(err=>{
         toast.error(err.response.data.message)
        })
    }
    useEffect(()=>{
      if(productData){
        setNom(productData.nom || "")
        setPrenom(productData.prenom || "")
        setEmail(productData.email || "")
        setTelephone(productData.telephone || "")
      }
  
    },[productData])
  
  return (
    <form action="" onSubmit={updateProduct} className='flex relative flex-col w-full gap-5 bg-gray-200 p-4 rounded-md shadow-md shadow-black'>
        <button onClick={()=>setModal(false)} className='relative justify-end flex'>X</button>
        <TextField onChange={(e)=>setNom(e.target.value)  } label="Nom" value={nom}/>
        <TextField onChange={(e)=>setPrenom(e.target.value)  }   label="Designation" value={prenom}/>
        <TextField onChange={(e)=>setTelephone(e.target.value)  }  label="telephone" value={telephone}/>
        <TextField onChange={(e)=>setEmail(e.target.value)  }  label="Categorie" value={email}/>
       
        <div className="btn flex items-center gap-6">
            <Button sx={{ backgroundColor: "#0e0e0e" }} type="submit" variant='contained'>Mettre à jour</Button>
            <Button onClick={()=>setModal(false)} sx={{outline:"black", color:"black", borderColor:"black"}}>Annuler</Button>
        </div>
    </form>
  )
}
