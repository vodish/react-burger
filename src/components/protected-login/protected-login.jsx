import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

/*
только для прохожих
  /login
  /register
  /reset-password
  /forgot-password  -- только для посетивших /reset-password
*/


export default function ProtectedLogin({element})
{
  const refreshToken = useSelector(state => state.refreshToken)


  if ( refreshToken ) {
    return <Navigate to="/?ProtectedLogin" replace />
  }

  
  return element;
}
