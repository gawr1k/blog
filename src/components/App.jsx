import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setLoginUser } from '../store/slices/loginSlice'
import { setCurrentPage } from '../store/slices/postsSlice'
import {
  PATH_HOME,
  PATH_ARTICLE,
  PATH_SLUG,
  PATH_SLUG_EDIT,
  PATH_SIGN_IN,
  PATH_SIGN_UP,
  PATH_PROFILE,
  PATH_NEW_ARTICLE,
  NOT_FOUND,
} from '../routes'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import PostList from './PostList/PostList'
import Slug from './Slug/Slug'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'
import Profile from './Profile/Profile'
import Layout from './Layout'
import NotFoundPage from './NotFoundPage/NotFoundPage'
import Create from './Create/Create'
import Edit from './Edit/Edit'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const storedUser = localStorage.getItem('token')
    const currentPage = sessionStorage.getItem('currentPage')
    switch (storedUser) {
      case null:
        dispatch(setLoginUser(null))
        break
      case undefined:
        dispatch(setLoginUser(null))
        break
      default: {
        dispatch(setLoginUser(storedUser))
        break
      }
    }
    dispatch(setCurrentPage(currentPage))
  }, [dispatch])

  return (
    <Routes>
      <Route path={PATH_HOME} element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path={PATH_ARTICLE} element={<PostList />} />
        <Route path={PATH_SLUG} element={<Slug />} />
        <Route
          path={PATH_SLUG_EDIT}
          element={
            <PrivateRoute>
              <Edit />
            </PrivateRoute>
          }
        />
        <Route
          path={PATH_SIGN_IN}
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path={PATH_SIGN_UP}
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path={PATH_PROFILE}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path={PATH_NEW_ARTICLE}
          element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          }
        />
        <Route path={NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
