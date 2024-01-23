import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import { useDispatch } from 'react-redux';
import { getProfileThunk, setIsAuthCheck } from '../../services/appSlice';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';


export default function App()
{
  const dispatch = useDispatch()
  const location = useLocation();
  const background = location.state && location.state.background;
  


  useEffect(()=>{
    dispatch( getProfileThunk() )
  }, [])


  return <>
    <Routes location={background || location}>
      <Route path="/"                 element={<Constructor/>} />
      <Route path="/ingredients/:id"  element={<IngredientsId />} />
    
      <Route path="/login"            element={ <OnlyUnAuth component={<Login/>}/> } />
      <Route path="/register"         element={ <OnlyUnAuth component={<Register/>}/> } />
      <Route path="/forgot-password"  element={ <OnlyUnAuth component={<ForgotPassword/>}/> } />
      <Route path="/reset-password"   element={ <OnlyUnAuth component={<ResetPassword/>}/> } />

      <Route path="/feed"             element={<Feed/>} />
      <Route path="/feed/:id"         element={<Feed/>} />
      
      <Route path="/profile"          element={ <OnlyAuth component={<Profile/>}/> }>
        <Route  path=""               element={<ProfileUser/>} />
        <Route  path="orders"         element={<ProfileOrders/>} />
      </Route>

      <Route path="*"                 element={<Page404/>} />
    </Routes>

    {background && (
        <Routes>
	        <Route
	          path='/ingredients/:id'
	          element={<IngredientsId/>}
	        />
        </Routes>
      )}
  </>
}
