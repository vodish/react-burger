import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';

import Constructor from "../../pages/constructor/constructor";
import IngredientsId from '../../pages/ingredients-id/ingredients-id';
import Profile from '../../pages/profile/profile';
import ProfileUser from '../../pages/profile-user/profile-user';
import ProfileOrders from '../../pages/profile-orders/profile-orders';

import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';

import Feed from '../../pages/feed/feed';
import Page404 from '../../pages/page404/page404';

import AppHeader from '../app-header/app-header';
import OrderId from '../../pages/order-id/order-id';

import { IsAuth, NoAuth } from '../protected-route/protected-route';
import { useDispatch2 } from '../../services/redux';
import { getIngredientsThunk, getProfileThunk } from '../../services/appSlice';


export default function App()
{
  const dispatch = useDispatch2()
  const location = useLocation();
  const background = location.state && location.state.background;
  
  
  useEffect(()=>{
    dispatch( getProfileThunk(null) )
    dispatch( getIngredientsThunk(null) )
  }, [])


  return (
    <div className="app">
      <AppHeader />

      <main className="main">
        <Routes location={background || location}>
          <Route path="/"                 element={<Constructor/>} />
          <Route path="/ingredients/:id"  element={<IngredientsId />} />
        
          <Route path="/login"            element={ <NoAuth component={<Login/>}/> } />
          <Route path="/register"         element={ <NoAuth component={<Register/>}/> } />
          <Route path="/forgot-password"  element={ <NoAuth component={<ForgotPassword/>}/> } />
          <Route path="/reset-password"   element={ <NoAuth component={<ResetPassword/>}/> } />

          <Route path="/feed"             element={<Feed/>} />
          <Route path="/feed/:id"         element={<OrderId/>} />
          
          <Route path="/profile"          element={ <IsAuth component={<Profile/>}/> }>
            <Route  path=""               element={<ProfileUser/>} />
            <Route  path="orders"         element={<ProfileOrders/>} />
            <Route  path="orders/:id"     element={<ProfileOrders/>} />
          </Route>

          <Route path="*"                 element={<Page404/>} />
        </Routes>
        
        {background && (
          <Routes>
            <Route path='/ingredients/:id'    element={<IngredientsId/>}  />
            <Route path="/feed/:id"           element={<OrderId/>} />
            <Route path="/profile/orders/:id" element={<OrderId/>} />
          </Routes>
        )}
      </main>

    </div>
  )
}
