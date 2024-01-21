/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-confusing-arrow */
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import avatar from '../../assets/smiley-cyrus.jpg'
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
    if (isAuth && status === 'succeeded') {
      dispatch(fetchGetProfile({ username, token }))
    }
  }, [status, dispatch])
  return (
    <header className={style.header}>
      <div className={style.header__container}>
        <NavLink
          to="/articles"
          className={({ isActive }) =>
            isActive
              ? `${style.active} ${style.header__container__btn} ${style.name__blog}`
              : `${style.header__container__btn} ${style.name__blog}`
          }
          type="button"
        >
          Realworld Blog
        </NavLink>
      </div>
      {isAuth ? (
        <div className={style.header__container}>
          <NavLink
            to="/new-article"
            className={({ isActive }) =>
              isActive
                ? `${style.header__container__btn} ${style.create_article_activ}`
                : `${style.header__container__btn} ${style.create_article}`
            }
            type="button"
          >
            Create article
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? `${style.header__container__btn} ${style.username} ${style.active}`
                : `${style.header__container__btn} ${style.username}`
            }
            type="button"
          >
            <span className={style.username_span}>{username}</span>
            <img
              className={style.username_img}
              src={image || avatar}
              alt="avatar"
            />
          </NavLink>
          <NavLink
            to="/articles"
            className={({ isActive }) =>
              isActive
                ? `${style.header__container__btn} ${style.logout} ${style.active}`
                : `${style.header__container__btn} ${style.logout}`
            }
            type="button"
            onClick={handleLogout}
          >
            Log Out
          </NavLink>
        </div>
      ) : (
        <div className={style.header__container}>
          <NavLink
            to="/sign-in"
            className={({ isActive }) =>
              isActive
                ? `${style.header__container__btn} ${style.sign__in} ${style.active}`
                : `${style.header__container__btn} ${style.sign__in}`
            }
            type="button"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/sign-up"
            className={({ isActive }) =>
              isActive
                ? `${style.header__container__btn}  ${style.sign__up_activ}`
                : `${style.header__container__btn} ${style.sign__up}`
            }
            type="button"
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </header>
  )
}
