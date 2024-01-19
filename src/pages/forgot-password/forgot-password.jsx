import AppHeader from "../../components/app-header/app-header"
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register()
{
  const [ email, setEmail ] = useState('')
  

  function handleSubmit(e) {
    e.preventDefault()
    alert("Отправить форму")
  }

  return <AppHeader view="center">
    
    <form className="form" onSubmit={handleSubmit}>

      <h1>Восстановление пароля</h1>
      
      <div className="row">
        <EmailInput
          onChange={e => setEmail(e.target.value)}
          value={email}
          name="email"
        />
      </div>
      
      <div className="row submit">
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
        >Восстановить</Button>
      </div>
      
      
      <p className="note">Вспомнили пароль? <Link to="/login">Войти</Link></p>
    </form>

  </AppHeader>
}