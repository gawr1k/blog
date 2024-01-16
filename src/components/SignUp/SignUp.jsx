import { useForm, Controller } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Checkbox } from 'antd'
import { useDispatch } from 'react-redux'

import { registerUser } from '../../store/slices/loginSlice.js'

import style from './SignUp.module.scss'

function SignUp() {
  const navigate = useNavigate()
  console.log('Render PostList')
  const dispatch = useDispatch()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    console.log(data)
    dispatch(registerUser(data))
    navigate('/')
  }

  return (
    <form className={style.form}>
      <h1 className={style.title}>Create new account</h1>

      <label htmlFor="username" className={style.label}>
        Username
        <input
          className={errors.username ? style.input__error : style.input}
          {...register('username', {
            required: true,
            minLength: 3,
            maxLength: 20,
          })}
          placeholder="Username"
        />
        {errors.username && <p className={style.error}>Введите имя</p>}
      </label>

      <label htmlFor="email" className={style.label}>
        Email address
        <input
          className={errors.email ? style.input__error : style.input}
          {...register('email', {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          placeholder="Email address"
        />
        {errors.email && <p className={style.error}>Неверный email</p>}
      </label>

      <label htmlFor="password" className={style.label}>
        Password
        <input
          className={errors.password ? style.input__error : style.input}
          {...register('password', {
            required: true,
            minLength: 6,
            maxLength: 40,
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <p className={style.error}>Минимум 6 символов</p>}
      </label>

      <label htmlFor="password_repeat" className={style.label}>
        Repeat Password
        <input
          className={errors.password_repeat ? style.input__error : style.input}
          {...register('password_repeat', {
            required: true,
            minLength: 6,
            maxLength: 40,
          })}
          type="password"
          placeholder="Repeat Password"
        />
        {errors.password_repeat && (
          <p className={style.error}>Пароли должны совпадать</p>
        )}
      </label>

      <div className={style.divider}> </div>

      <Controller
        control={control}
        name="agreement"
        render={({ field, fieldState }) => (
          <>
            <Checkbox
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            >
              I agree to the processing of my personal information
            </Checkbox>
            {fieldState?.invalid && (
              <span style={{ color: 'red' }}>
                Это поле обязательно для заполнения
              </span>
            )}
          </>
        )}
        rules={{ required: 'You must agree to the terms' }}
      />

      <Button
        className={style.btn}
        type="primary"
        onClick={handleSubmit(onSubmit)}
      >
        Register
      </Button>
      <h5 className={style.link}>
        Already have an account?
        <Link to="/sign-in" className={style.link__sign}>
          Sign In
        </Link>
      </h5>
    </form>
  )
}

export default SignUp
