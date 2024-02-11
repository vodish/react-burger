import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import cm from './profile.module.css'
import { updateProfileThunk } from '../../services/appSlice'
import { useForm } from '../../hooks/useForm'
import { useDispatch2, useSelector2 } from '../../services/redux'



export default function ProfileUser()
{
  const dispatch    = useDispatch2()
  const user        = useSelector2( state => state.user )

  const {values, handleChange} = useForm({
    name:     user.name,
    email:    user.email,
    password: '',
  })
  

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    dispatch( updateProfileThunk(values) )
  }

  return(
    <form className="form v2 double" onSubmit={handleSubmit}>
      <p className={cm.note}>В этом разделе вы можете изменить свои персональные данные.</p>

       
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
        >Обновить</Button>
      </div>
    </form>
  )
}