import React from 'react'
import { useNavigate } from 'react-router-dom'
import Login from './Login'

export default function Logout() {
  sessionStorage.removeItem("user")
  const navigate = useNavigate()
  navigate("/")
  return (
  
    <Login/>
  )
}
