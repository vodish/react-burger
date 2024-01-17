import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cm from './app-header.module.css'
import PropTypes from "prop-types"
import { NavLink } from "react-router-dom";




AppHeader.propTypes = {
  view:  PropTypes.string,
}


export default function AppHeader({children, view})
{

  return (
    <div className={cm.app}>

      <header className={cm.header}>
        <div className={cm.wrap}>
          <div className={cm.nav}>
            <NavLink to="/"         className={cm.btn}><BurgerIcon type="primary" /><span>Конструктор</span></NavLink>
            <NavLink to="/orders"   className={cm.btn}><ListIcon type="secondary" /><span>Лента заказов</span></NavLink>
          </div>
          <NavLink to="/"  className={cm.logo}><Logo /></NavLink>
          <div className={cm.user}>
            <NavLink to="/profile"  className={cm.btn}><ProfileIcon type="secondary" /><span>Личный кабинет</span></NavLink>
          </div>
        </div>
      </header>
      
      <main className={`${cm.main} ${checkMainView(view)}`}>
        {children}
      </main>
      
    </div>
  )
}



function checkMainView(view)
{
  switch(view) {
    case 'center': return cm.mainCenter;
    case 'double': return cm.mainDouble;
  }
}