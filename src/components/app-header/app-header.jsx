import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cm from './app-header.module.css'
import { Link, NavLink } from "react-router-dom";



export default function AppHeader({children})
{

  return (
    <div className={cm.app}>
      <header className={cm.header}>
        <div className={cm.wrap}>
          <div className={cm.nav}>
            <NavLink to="/"  className={cm.btn}><BurgerIcon type="primary" /><span>Конструктор</span></NavLink>
            <NavLink to="/orders"       className={cm.btn}><ListIcon type="secondary" /><span>Лента заказов</span></NavLink>
          </div>
          <NavLink to="/"  className={cm.logo}><Logo /></NavLink>
          <div className={cm.user}>
            <NavLink to="/profile"    className={cm.btn}><ProfileIcon type="secondary" /><span>Личный кабинет</span></NavLink>
          </div>
        </div>
      </header>
      <main className={cm.main}>
        {children}
      </main>


      <ul class={cm.pages}>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">register</Link></li>
        <li><Link to="/forgot-password">forgot-password</Link></li>
        <li><Link to="/reset-password">reset-password</Link></li>
        <li><Link to="/reset-password">reset-password</Link></li>
        <li><Link to="/ingredients/2323">ingredients/:id</Link></li>
      </ul>
    </div>
  )
}
