import AppHeader from "../../components/app-header/app-header"
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import ProfileMenu from "../../components/profile-menu/profile-menu"



export default function ProfileHistory()
{
  
  return <AppHeader view="double">

    <ProfileMenu />

    <div>
      История заказов
    </div>

  </AppHeader>
}