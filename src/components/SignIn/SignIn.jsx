/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

import style from './SignIn.module.scss'

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={style.title}>Sign In</h1>
      <label className={style.label} htmlFor="email">
        Email address
        <input
          className={errors.email ? style.input__error : style.input}
          {...register('email', { required: true, pattern: /valid email/ })}
          placeholder="Email address"
        />
        {errors.email && <p className={style.error}>Неверный email</p>}
      </label>

      <label className={style.label} htmlFor="password">
        Password
        <input
          className={errors.email ? style.input__error : style.input}
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
      <Button className={style.btn} type="primary">
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
