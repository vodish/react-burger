import { useDispatch2 } from '../../services/redux'
import cm from './profile.module.css'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { sendLogoutThunk } from '../../services/appSlice'
import { Ttoken } from '../../utils/types'


// export default function Profile({isBackground = true}: {isBackground?: boolean})
export default function Profile()
{
  const dispatch    = useDispatch2()
  const location    = useLocation()
  
  

  function handleLogout() {
    const token: Ttoken = { token: localStorage.getItem('refreshToken') }
    
    dispatch( sendLogoutThunk(token) )
  }



  return <>
      <div className={`${cm.menu} double`}>
        <ul>
          <li><NavLink to="/profile" className={it=>it.isActive ? cm.active: ''} end>Профиль</NavLink></li>
          <li><NavLink to="/profile/orders" className={it=>it.isActive ? cm.active: ''}>История заказов</NavLink></li>
          <li><span onClick={handleLogout}>Выход</span></li>
        </ul>

        {/* {JSON.stringify(location)} */}
      </div>
      
    <Outlet />
  </>
}