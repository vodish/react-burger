import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page404 from '../../pages/page404/page404';

import Constructor from "../../pages/constructor/constructor";
import IngredientsId from '../../pages/ingredients-id/ingredients-id';
import Profile from '../../pages/profile/profile';
import ProfileOrders from '../../pages/profile-orders/profile-orders';

import Feed from '../../pages/feed/feed';

import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';

import ProfileUser from '../../pages/profile-user/profile-user';
import ProtectedProfile from '../protected-profile/protected-profile';
import ProtectedLogin from '../protected-login/protected-login';
import { useDispatch } from 'react-redux';
import { getProfileThunk } from '../../services/appSlice';


export default function App()
{
  const dispatch = useDispatch()

  useEffect(()=>{
    if ( localStorage.getItem('accessToken') ) {
      dispatch( getProfileThunk() )
    }
  }, [])


  return(
    <BrowserRouter>
      <Routes>
        <Route path="/"                 element={<Constructor/>} />
        <Route path="/ingredients/:id"  element={<IngredientsId/>} />

        <Route path="/login"            element={ <ProtectedLogin element={<Login/>}/> } />
        <Route path="/register"         element={ <ProtectedLogin element={<Register/>}/> } />
        <Route path="/forgot-password"  element={ <ProtectedLogin element={<ForgotPassword/>}/> } />
        <Route path="/reset-password"   element={ <ProtectedLogin element={<ResetPassword/>}/> } />
        <Route path="/reset-password"   element={ <ProtectedLogin element={<ResetPassword/>}/> } />

        <Route path="/feed"             element={<Feed/>} />
        <Route path="/feed/:id"         element={<Feed/>} />
        
        <Route path="/profile"          element={ <ProtectedProfile element={<Profile/>}/> }>
          <Route  path=""               element={<ProfileUser/>} />
          <Route  path="orders"         element={<ProfileOrders/>} />
        </Route>

        <Route path="*"                 element={<Page404/>} />
      </Routes>
    </BrowserRouter>
  )
}
