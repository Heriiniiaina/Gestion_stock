import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function AddCustomer() {
    const [nom,setNom] = useState("")
    const [prenom,setPrenom] = useState("")
    const [email,setEmail] = useState("")
    const [telephone,setPhone] = useState("")
   
    const addProduct = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/client/addClient",{nom,telephone,prenom,email}).then(res=>{
            toast.success(res.data.message)
            setPhone("")
            setEmail("")
            setPrenom("")
            setNom("")
            
        }).catch(err=>{
            toast.error(err.response.data.message)
        })
    }
  return (
    <div className='flex flex-col items-center justify-center w-full p-3 gap-8'>
        <h2 className='text-3xl'>Ajouter un client</h2>
        <form action="" onSubmit={addProduct} className='text-white flex flex-col items-center justify-center gap-8'>
            <TextField label="Nom du client" value={nom} onChange={e=>setNom(e.target.value)} variant="outlined" required/>
            <TextField label="Prenom du client" value={prenom} onChange={e=>setPrenom(e.target.value)}   variant="outlined" required/>
            <TextField label="Email du client" value={email} onChange={e=>setEmail(e.target.value)}   variant="outlined" required/>
            <TextField type='number' label="Telephone du client" value={telephone} onChange={e=>setPhone(e.target.value)}   variant="outlined" required/>
            <Button type='submit' sx={{backgroundColor:"#0e0e0e",color:"white"}} variant="outlined">Ajouter</Button>
        </form>
    </div>
  )
}
