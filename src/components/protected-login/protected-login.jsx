// import { useEffect, useState }  from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

/*
только для прохожих
  /login
  /register
  /reset-password
  /forgot-password  -- только для посетивших /reset-password
*/


export default function ProtectedLogin({element})
{
  const userEmail = useSelector(state=>state.user.email)
  
  

  if ( userEmail ) {
    return <Navigate to="/?ProtectedLogin" replace />
  }

  
  return element;
}
