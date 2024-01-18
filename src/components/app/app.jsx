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

import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';


export default function App()
{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>

        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/feed/:id" element={<Feed />}></Route>

        <Route path="/" element={<Constructor />}></Route>
        <Route path="/profile" element={<ProtectedRouteElement element={<Profile />} />}></Route>
        <Route path="/profile/orders" element={<ProfileOrders />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/ingredients/:id" element={<IngredientsId />}></Route>
        
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
