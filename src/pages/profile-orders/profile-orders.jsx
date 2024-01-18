import AppHeader from "../../components/app-header/app-header"
import ProfileMenu from "../../components/profile-menu/profile-menu"



export default function ProfileOrders()
{
  
  return <AppHeader view="double">

    <ProfileMenu />

    <div>
      История заказов
    </div>

  </AppHeader>
}