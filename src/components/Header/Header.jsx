import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import avatar from '../../assets/avatar_blog.svg'
import useAuth from '../../hooks/use-auth.js'
import { logoutUser } from '../../store/slices/userSlice.js'

import style from './Header.module.scss'

export default function Header() {
  const { isAuth, username } = useAuth()
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutUser())
  }

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
            to="/articles"
            className={`${style.header__container__btn} ${style.sign__up}`}
            type="button"
          >
            Create article
          </Link>
          <Link
            to="/profile"
            className={`${style.header__container__btn} ${style.sign__in}`}
            type="button"
          >
            {username}
            <img src={avatar} alt="avatar" />
          </Link>
          <Link
            to="/articles"
            className={`${style.header__container__btn} ${style.sign__in}`}
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
