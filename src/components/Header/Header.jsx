import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectStatus,
  logoutUser,
  fetchGetProfile,
} from '../../store/slices/loginSlice.js'
import useAuth from '../../hooks/use-auth.js'

import style from './Header.module.scss'

export default function Header() {
  const { isAuth, username, token, image } = useAuth()
  const dispatch = useDispatch()
  const status = useSelector(selectStatus)

  const handleLogout = () => {
    dispatch(logoutUser())
  }
  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(fetchGetProfile({ username, token }))
      console.log(image)
    }
  }, [status, dispatch])
  return (
    <header className={style.header}>
      <div className={style.header__container}>
        <Link
          to="/articles"
          className={`${style.header__container__btn} ${style.name__blog}`}
          type="button"
        >
          Realworld Blog
        </Link>
      </div>
      {isAuth ? (
        <div className={style.header__container}>
          <Link
            to="/new-article"
            className={`${style.header__container__btn} ${style.create_article}`}
            type="button"
          >
            Create article
          </Link>
          <Link
            to="/profile"
            className={`${style.header__container__btn} ${style.username}`}
            type="button"
          >
            <span className={style.username_span}>{username}</span>
            <img className={style.username_img} src={image} alt="avatar" />
          </Link>
          <Link
            to="/articles"
            className={`${style.header__container__btn} ${style.logout}`}
            type="button"
            onClick={handleLogout}
          >
            Log Out
          </Link>
        </div>
      ) : (
        <div className={style.header__container}>
          <Link
            to="/sign-in"
            className={`${style.header__container__btn} ${style.sign__in}`}
            type="button"
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className={`${style.header__container__btn} ${style.sign__up}`}
            type="button"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  )
}
