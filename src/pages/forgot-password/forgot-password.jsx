import AppHeader from "../../components/app-header/app-header"
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchRequest } from "../../utils/api"

/*
@kruglovand
3)
Реализовать проверку того, что на страницу reset-password можно попасть только с forgot-paassword,
можно следующим образом: после сабмита формы на странице forgot-password
отправляете запрос на сервер (не надо делать для этого экшен, просто обычная функция)
и когда запрос завершится успешно (в then) записываете в localStorage флаг
и делаете редирект на reset-password.

ответ успеха {
  "success": true,
  "message": "Reset email sent"
} 
*/

export default function Register()
{
  const [ email, setEmail ] = useState('')
  const [ apiError, setApiError ] = useState(null)
  const navigate = useNavigate()


  async function handleSubmit(e) {
    e.preventDefault()
    
    let res = await fetchRequest('/api/password-reset', {
      method: "POST",
      headers: {'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({email}),
    })

    if ( res.success ) {
      sessionStorage.setItem('forgot-password', 1);
      navigate('/reset-password')
    }
    else {
      console.log(res)
      setApiError(res)
    }
  }

  
  return <AppHeader view="center">

    <form className="form" onSubmit={handleSubmit}>

      <h1>Восстановление пароля</h1>
      
      {apiError 
        ? <pre className="error apiError">{apiError}</pre>
        : null
      }

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