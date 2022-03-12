import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () =>{
    const status = JSON.parse(localStorage.getItem('isLoggedIn'))
    return status ? <Outlet /> : <Navigate to ={'/'} />
} 

export default ProtectedRoutes