import { useForm } from 'react-hook-form'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'

import useAuth from '../../hooks/use-auth.js'
import { editProfile } from '../../store/slices/profileSlice.js'

import style from './Profile.module.scss'

function Profile() {
  const dispatch = useDispatch()
  const { token } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    dispatch(editProfile({ ...data, token }))
    console.log(data)
  }

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={style.title}>Edit Profile</h1>

      <label htmlFor="Username" className={style.label}>
        Username
        <input
          className={errors.username ? style.input__error : style.input}
          {...register('username', {
            minLength: 1,
          })}
          placeholder="Username"
        />
        {errors.username && <p className={style.error}>Введите новое имя</p>}
      </label>

      <label htmlFor="Email address" className={style.label}>
        Email address
        <input
          className={errors.email ? style.input__error : style.input}
          {...register('email', {
            pattern: /^\S+@\S+$/,
          })}
          placeholder="Email address"
        />
        {errors.email && <p className={style.error}>Неверный email</p>}
      </label>

      <label htmlFor="New password" className={style.label}>
        New password
        <input
          className={errors.password ? style.input__error : style.input}
          {...register('password', {
            minLength: 6,
            maxLength: 40,
          })}
          placeholder="New password"
        />
        {errors.password && <p className={style.error}>Минимум 6 символов</p>}
      </label>

      <label htmlFor="Avatar image" className={style.label}>
        Avatar image (url)
        <input
          className={errors.avatarURL ? style.input__error : style.input}
          {...register('avatarURL', {
            pattern: /^https?:\/\/.+\..+$/,
          })}
          placeholder="Avatar image"
        />
        {errors.avatarURL && (
          <p className={style.error}>Введите корректный URL</p>
        )}
      </label>

      <Button
        className={style.btn}
        type="primary"
        onClick={handleSubmit(onSubmit)}
      >
        Save
      </Button>
    </form>
  )
}

export default Profile
