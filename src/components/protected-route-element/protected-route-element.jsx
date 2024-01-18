import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { useAuth } from '../services/auth';

/*
только для клиентов
  /profile*
только для прохожих
  /login
  /register
  /reset-password
  /forgot-password  -- только для посетивших /reset-password
*/


export function ProtectedRouteElement({ element })
{
  const [isUserLoaded, setUserLoaded] = useState(false);

  // console.log(element)
  
  // let { getUser, ...auth } = useAuth();

  // const init = async () => {
  //   await getUser();
  //   setUserLoaded(true);
  // };

  // useEffect(() => {
  //   init();
  // }, []);


  // if (!isUserLoaded) {
  //   return null;
  // }

  // return auth.user ? element : <Navigate to="/login" replace/>;
  

  return element;
}