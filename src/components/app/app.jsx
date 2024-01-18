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

import ProtectedRoute from '../protected-route/protected-route';
import ProfileUser from '../../pages/profile-user/profile-user';


export default function App()
{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/"                 element={<Constructor/>} />

        <Route path="/login"            element={ <ProtectedRoute element={<Login/>}/> } />
        <Route path="/register"         element={ <ProtectedRoute element={<Register/>}/> } />
        <Route path="/forgot-password"  element={ <ProtectedRoute element={<ForgotPassword/>}/> } />
        <Route path="/reset-password"   element={ <ProtectedRoute element={<ResetPassword/>}/> } />
        <Route path="/reset-password"   element={ <ProtectedRoute element={<ResetPassword/>}/> } />

        <Route path="/ingredients/:id"  element={<IngredientsId/>} />
        <Route path="/feed"             element={<Feed/>} />
        <Route path="/feed/:id"         element={<Feed/>} />
        
        <Route path="/profile"          element={ <ProtectedRoute element={<Profile/>}/> }>
          <Route  path=""               element={<ProfileUser/>} />
          <Route  path="orders"         element={<ProfileOrders/>} />
        </Route>

        <Route path="*"                 element={<Page404/>} />
      </Routes>
    </BrowserRouter>
  )
}
