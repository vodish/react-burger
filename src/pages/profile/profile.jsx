import AppHeader from "../../components/app-header/app-header"
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import ProfileMenu from "../../components/profile-menu/profile-menu"



export default function Profile()
{
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  


  function handleSubmit(e) {
    e.preventDefault()
    alert("Отправить форму")
  }

  return <AppHeader view="double">

    <ProfileMenu />

    <form className="form v2" onSubmit={handleSubmit}>
      <p style={{maxWidth: 450}}>В этом разделе вы можете изменить свои персональные данные.</p>

      <div className="row">
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setName(e.target.value)}
          value={name}
          name={'name'}
        />
      </div>
      <div className="row">
        <EmailInput
          onChange={e => setEmail(e.target.value)}
          value={email}
          name="email"
          isIcon={false}
        />
      </div>
      <div className="row">
        <PasswordInput
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
        />
      </div>
      
      <div className="row submit">
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
        >Обновить</Button>
      </div>

    </form>

  </AppHeader>
}