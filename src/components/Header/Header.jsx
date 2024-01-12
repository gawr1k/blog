import { Link } from 'react-router-dom'

import style from './Header.module.scss'

export default function Header() {
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
      <div className={style.header__container}>
        <button
          className={`${style.header__container__btn} ${style.sign__in}`}
          type="button"
        >
          Sign In
        </button>
        <button
          className={`${style.header__container__btn} ${style.sign__up}`}
          type="button"
        >
          Sign Up
        </button>
      </div>
    </header>
  )
}