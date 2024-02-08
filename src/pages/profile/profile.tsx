import { useDispatch } from 'react-redux'
import cm from './profile.module.css'
import { NavLink, Outlet } from 'react-router-dom'
import { sendLogoutThunk } from '../../services/js_appSlice'
import { Ttoken } from '../../utils/types'


export default function Profile()
{
  const dispatch = useDispatch()


  function handleLogout() {
    const token: Ttoken = { token: localStorage.getItem('refreshToken') }
    // @ts-ignore
    dispatch( sendLogoutThunk(token) )
  }



  return <>
    <div className={`${cm.menu} double`}>
      <ul>
        <li><NavLink to="/profile" className={it=>it.isActive ? cm.active: ''} end>Профиль</NavLink></li>
        <li><NavLink to="/profile/orders" className={it=>it.isActive ? cm.active: ''}>История заказов</NavLink></li>
        <li><span onClick={handleLogout}>Выход</span></li>
      </ul>
    </div>

    <Outlet />
  </>
}