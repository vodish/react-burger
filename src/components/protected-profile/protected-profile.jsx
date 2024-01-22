// import { useEffect, useState }  from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'



export default function ProtectedProfile({element})
{
  const userEmail = useSelector(state=>state.user.email)



  if ( ! userEmail ) {
    return <Navigate to="/login" replace />
  }

  return element;
}
