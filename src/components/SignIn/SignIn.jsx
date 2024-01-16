import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'

import { loginUser } from '../../store/slices/loginSlice.js'

import style from './SignIn.module.scss'

function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    dispatch(loginUser({ email: data.email, password: data.password }))
    navigate('/')
  }

  return (
    <form className={style.form}>
      <h1 className={style.title}>Sign In</h1>
      <label className={style.label} htmlFor="email">
        Email address
        <input
          className={errors.email ? style.input__error : style.input}
          {...register('email', {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          })}
          placeholder="Email address"
        />
        {errors.email && <p className={style.error}>Неверный email</p>}
      </label>

      <label className={style.label} htmlFor="password">
        Password
        <input
          className={errors.password ? style.input__error : style.input}
          {...register('password', {
            required: true,
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <p className={style.error}>Поле обязательно к заполнению</p>
        )}
      </label>
      <Button
        className={style.btn}
        type="primary"
        onClick={handleSubmit(onSubmit)}
      >
        Login
      </Button>
      <h5 className={style.link}>
        Don&apos;t have an account?
        <Link to="/sign-up" className={style.link__sign}>
          Sign Up
        </Link>
        .
      </h5>
    </form>
  )
}

export default SignIn
