import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button, Checkbox } from 'antd'

import style from './SignUp.module.scss'

function SignUp() {
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
      <h1 className={style.title}>Create new account</h1>
      <label htmlFor="Username" className={style.label}>
        Username
        <input
          className={errors.username ? style.input__error : style.input}
          {...register('username', { required: true, minLength: 3 })}
          placeholder="Username"
        />
        {errors.username && <p className={style.error}>Введите имя</p>}
      </label>
      <label htmlFor="Email address" className={style.label}>
        Email address
        <input
          className={errors.email ? style.input__error : style.input}
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          placeholder="Email address"
        />
        {errors.email && <p className={style.error}>Неверный email</p>}
      </label>
      <label htmlFor="Password" className={style.label}>
        Password
        <input
          className={errors.password ? style.input__error : style.input}
          {...register('password', { required: true, minLength: 6 })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <p className={style.error}>Минимум 6 символов</p>}
      </label>
      <label htmlFor="Repeat Password" className={style.label}>
        Repeat Password
        <input
          className={errors.password_repeat ? style.input__error : style.input}
          {...register('password_repeat', { required: true, minLength: 6 })}
          type="password"
          placeholder="Repeat Password"
        />
        {errors.password_repeat && (
          <p className={style.error}>Пароли должны совпадать</p>
        )}
      </label>
      <div className={style.divider}> </div>
      <div className={style.checkbox__container}>
        <Checkbox className={style.checkbox}>
          <div className={style.checkbox__text}>
            I agree to the processing of my personal information
          </div>
        </Checkbox>
      </div>
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
