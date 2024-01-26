import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  PATH_ARTICLE,
  PATH_NEW_ARTICLE,
  PATH_PROFILE,
  PATH_SIGN_IN,
  PATH_SIGN_UP,
} from '../../routes'
import avatar from '../../assets/smiley-cyrus.jpg'
import {
  selectStatus,
  logoutUser,
  fetchGetProfile,
  selectToken,
  selectUserName,
  selectImageUser,
} from '../../store/slices/loginSlice'
import useAuth from '../../hooks/use-auth'

import style from './Header.module.scss'

export default function Header() {
  const { isAuth } = useAuth()
  const dispatch = useDispatch()
  const status = useSelector(selectStatus)
  const image = useSelector(selectImageUser)
  const username = useSelector(selectUserName)
  const token = useSelector(selectToken)
  const [imgError, setImgError] = useState(false)

  const handleLogout = () => {
    dispatch(logoutUser())
  }
  useEffect(() => {
    if (isAuth && status === 'succeeded') {
      dispatch(fetchGetProfile({ token }))
    }
  }, [status, dispatch])

  const handleImgError = () => {
    setImgError(true)
  }

  return (
    <header className={style.header}>
      <div className={style.header__container}>
        <NavLink
          to={PATH_ARTICLE}
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
            to={PATH_NEW_ARTICLE}
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
            to={PATH_PROFILE}
            className={({ isActive }) =>
              isActive
                ? `${style.header__container__btn} ${style.username} ${style.active}`
                : `${style.header__container__btn} ${style.username}`
            }
            type="button"
          >
            <span className={style.username_span}>{username}</span>
            {imgError ? (
              <img className={style.username_img} src={avatar} alt="Avatar" />
            ) : (
              <img
                className={style.username_img}
                src={image || avatar}
                onError={handleImgError}
                alt="Author Avatar"
              />
            )}
          </NavLink>
          <NavLink
            to={PATH_ARTICLE}
            className={({ isActive }) =>
              isActive
                ? `${style.header__container__btn} ${style.logout} `
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
            to={PATH_SIGN_IN}
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
            to={PATH_SIGN_UP}
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
