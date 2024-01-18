import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Constructor from "../../pages/constructor/constructor";
import Page404 from '../../pages/page404/page404';
import Profile from '../../pages/profile/profile';
import Orders from '../../pages/orders/orders';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import IngredientsId from '../../pages/ingredients-id/ingredients-id';
import ProfileHistory from '../../pages/profile-history/profile-history';


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

        <Route path="/" element={<Constructor />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/profile/history" element={<ProfileHistory />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/ingredients/:id" element={<IngredientsId />}></Route>
        
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
