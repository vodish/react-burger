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
        <div className={cm.wrap1}>
          <div className={cm.nav}>
            <NavLink to="/" className={cm.link}>
              { it => it.isActive
                ? <><BurgerIcon type="secondary" /><span className={cm.active1}>Конструктор</span></>
                : <><BurgerIcon type="primary" /><span>Конструктор</span></>
              }
            </NavLink>
            <NavLink to="/feed" className={cm.link}>
              { it => it.isActive
                ? <><ListIcon type="secondary" /><span className={cm.active1}>Лента заказов</span></>
                : <><ListIcon type="primary" /><span>Лента заказов</span></>
              }
            </NavLink>
          </div>
          <NavLink to="/"  className={cm.logo}><Logo /></NavLink>
          <div className={cm.user}>
            <NavLink to="/profile" className={cm.link}>
              { it => it.isActive
                ? <><ProfileIcon type="secondary" /><span className={cm.active1}>Личный кабинет</span></>
                : <><ProfileIcon type="primary" /><span>Личный кабинет</span></>
              }
            </NavLink>
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