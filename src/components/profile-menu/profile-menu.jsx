import cm from './profile-menu.module.css'
import { NavLink } from 'react-router-dom'


export default function ProfileMenu()
{
  return (
    <div className={cm.menu}>
      <ul>
        <li><NavLink to="/profile" className={it=>it.isActive ? cm.active: ''} end>Профиль</NavLink></li>
        <li><NavLink to="/profile/history" className={it=>it.isActive ? cm.active: ''}>История заказов</NavLink></li>
        <li><NavLink to="/login">Выход</NavLink></li>
        <li><NavLink to="/ingredients/643d69a5c3f7b9001cfa093c">Ингредиент</NavLink></li>
      </ul>
    </div>   
  )
}