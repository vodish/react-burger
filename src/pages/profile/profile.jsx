import { useDispatch, useSelector } from 'react-redux'
import cm from './profile.module.css'
import { NavLink, Outlet } from 'react-router-dom'
import { sendLogoutThunk } from '../../services/appSlice'
import AppHeader from '../../components/app-header/app-header'


export default function Profile()
{
  const refreshToken = useSelector(state => state.refreshToken)
  const dispatch = useDispatch()


  function handleLogout() {
    dispatch( sendLogoutThunk({token: refreshToken}) )
  }



  return <AppHeader view="double">

    <div className={cm.menu}>
      <ul>
        <li><NavLink to="/profile" className={it=>it.isActive ? cm.active: ''} end>Профиль</NavLink></li>
        <li><NavLink to="/profile/orders" className={it=>it.isActive ? cm.active: ''}>История заказов</NavLink></li>
        <li><span onClick={handleLogout}>Выход</span></li>
        <li><NavLink to="/ingredients/643d69a5c3f7b9001cfa093c">Ингредиент</NavLink></li>
      </ul>
    </div>

    <Outlet />

</AppHeader>
}