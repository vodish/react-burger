import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';



export default function ProtectedProfile({element})
{
  const refreshToken  = useSelector(state => state.refreshToken)

  
  if ( ! refreshToken ) {
    return <Navigate to="/login" replace />
  }

  return element;
}
