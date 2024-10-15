import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography } from "@mui/material"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import loginPage from "../assets/page5.jpeg"
import logo from "../assets/logo1.png"
import Footer from '../components/Footer'
export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    if (user)
      return navigate("/home")
  }, [])
  const onSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8000/user/login", { username, password }).then(res => {
      toast.success(res.data.message)
      console.log(res.data)
      sessionStorage.setItem("user", JSON.stringify(res.data.user))
      navigate("/home")
    }).catch(err => {
      toast.error(err.response.data.message)

    })

  }
  return (
    <>
    
      <div className='loginPage flex w-screen h-full bg-slate-300' >
        <div className='h-screen flex flex-col justify-center items-center gap-8 w-1/2'>

          <div className='bg-black p-4 rounded-lg'>

            <img width={"300px"} src={logo} alt="" />
          </div>
          
          <div className='login  w-screen flex flex-col justify-center items-center gap-6'>
            <h2 className='text-3xl'>Se connecter</h2>
            <form action="" className='flex flex-col gap-3' onSubmit={onSubmit}>
              <TextField onChange={e => setUsername(e.target.value)} required variant="outlined" label="username" sx={{ width: "100%" }} />
              <TextField onChange={e => setPassword(e.target.value)} required label="mot de passe" variant="outlined" type="password" />
              <Button sx={{ backgroundColor: "#0e0e0e" }} type="submit" variant="contained">Connecter</Button>
              <Typography >Vous n'avez pas encore de compte ? <Link to={"/register"}>Cliquez ici</Link></Typography>
            </form>
          </div>
          <div className='absolute bottom-4'>
            <Footer/>
          </div>
        </div>
        <div className='w-1/2 h-full' >
          <img height={"768px"} src={loginPage} alt="" />
        </div>
      </div>

    </>
  )
}
