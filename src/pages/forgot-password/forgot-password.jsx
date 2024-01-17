import AppHeader from "../../components/app-header/app-header"
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Register()
{
  const [ code, setCode ] = useState('')
  const [ password, setPassword ] = useState('')
  

  function handleSubmit(e) {
    e.preventDefault()
    alert("Отправить форму")
  }

  return <AppHeader view="center">

    
    <form className="form" onSubmit={handleSubmit}>
      <h1>Восстановление пароля</h1>
      <div className="row">
        <PasswordInput
          placeholder={'Введите новый пароль'}
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
        />
      </div>
      <div className="row">
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={e => setCode(e.target.value)}
          value={code}
          name={'name'}
        />
      </div>
      
      <div className="row submit">
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
        >Сохранить</Button>
      </div>
      
      
      <p className="note">Вспомнили пароль? <Link to="/login">Войти</Link></p>
    </form>

  </AppHeader>
}