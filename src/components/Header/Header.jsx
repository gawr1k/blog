import { Link } from 'react-router-dom'

import avatar from '../../assets/avatar_blog.svg'
import useAuth from '../../hooks/use-auth.js'

import style from './Header.module.scss'

export default function Header() {
  const { isAuth } = useAuth()
  console.log(isAuth)

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
            to="/articles"
            className={`${style.header__container__btn} ${style.sign__in}`}
            type="button"
          >
            Log Out
            <img src={avatar} alt="avatar" />
          </Link>
          <Link
            to="/articles"
            className={`${style.header__container__btn} ${style.sign__in}`}
            type="button"
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
