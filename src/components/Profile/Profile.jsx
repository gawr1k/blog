import { useForm } from 'react-hook-form'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'

import useAuth from '../../hooks/use-auth.js'
import { editProfile } from '../../store/slices/loginSlice.js'

import style from './Profile.module.scss'

function Profile() {
  const dispatch = useDispatch()
  const { email, token, username, image } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    dispatch(editProfile({ ...data, token }))
  }

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={style.title}>Edit Profile</h1>

      <label htmlFor="Username" className={style.label}>
        Username
        <input
          className={errors.username ? style.input__error : style.input}
          {...register('username', {
            required: true,
            minLength: 1,
          })}
          defaultValue={username}
          placeholder="Username"
        />
        {errors.username && <p className={style.error}>Введите новое имя</p>}
      </label>

      <label htmlFor="Email address" className={style.label}>
        Email address
        <input
          className={errors.email ? style.input__error : style.input}
          {...register('email', {
            required: true,
            pattern: /^\S+@\S+$/,
          })}
          defaultValue={email}
          placeholder="Email address"
        />
        {errors.email && <p className={style.error}>Неверный email</p>}
      </label>

      <label htmlFor="New password" className={style.label}>
        New password
        <input
          className={errors.password ? style.input__error : style.input}
          {...register('password', {
            required: true,
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
          {...register('image', {
            pattern: /^https?:\/\/.+\..+$/,
          })}
          defaultValue={image}
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
