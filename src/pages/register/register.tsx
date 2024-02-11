import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { sendRegisterThunk } from "../../services/appSlice"
import { useForm } from '../../hooks/useForm'
import { useDispatch2, useSelector2 } from '../../services/redux'

/*
@kruglovand
4) Когда сделаете авторизацию, не забудьте добавить в запрос создания заказа 
в поле Authorization в заголовках токен доступа (с Bearer). Заказ будет готовиться 15 сек, 
поэтому стоит еще предусмотреть прелоадер для модалки заказа, чтобы пользователь понимал, 
что происходит в это время. Без этой модификации, у вас не будут появляться заказа 
в ленте заказов пользователя в профиле.
*/


export default function Register()
{
  const apiError  = useSelector2( state => state.apiError )
  const dispatch  = useDispatch2()

  
  const { values, handleChange } = useForm({
    name:     '',
    email:    '',
    password: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    dispatch(sendRegisterThunk(values))
  }

  return(

    <form className="form center" onSubmit={handleSubmit}>
      <h1>Регистрация</h1>

      {apiError === "User already exists"
        ? <div className="apiError">
            Сервер узнал вас, но почему-то хочет чтобы вы обязательно прошли форму входа...
            <p className="link"><Link to="/login">Войти</Link></p>
          </div>
        : apiError 
          ? <pre className="apiError">{apiError}</pre>
          : null
      }

      <div className="row">
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <EmailInput
          isIcon={false}
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <PasswordInput
          name="password"
          value={values.password}
          onChange={handleChange}
        />
      </div>
      
      <div className="row submit">
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
        >Зарегистрироваться</Button>
      </div>
      

      <p className="note">Уже зарегистрированы? <Link to="/login">Войти</Link></p>
    </form>
  )
}