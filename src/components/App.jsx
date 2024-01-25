import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setLoginUser } from '../store/slices/loginSlice'
import { setCurrentPage } from '../store/slices/postsSlice'

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
    const storedUser = localStorage.getItem('user')
    const currentPage = sessionStorage.getItem('currentPage')
    switch (storedUser) {
      case null:
        dispatch(setLoginUser({}))
        break
      case undefined:
        dispatch(setLoginUser({}))
        break
      default: {
        const parsedUser = JSON.parse(storedUser)
        dispatch(setLoginUser(parsedUser))
        break
      }
    }

    dispatch(setCurrentPage(currentPage))
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path="articles" element={<PostList />} />
        <Route path="articles/:slug" element={<Slug />} />
        <Route
          path="articles/:slug/edit"
          element={
            <PrivateRoute>
              <Edit />
            </PrivateRoute>
          }
        />

        <Route
          path="/sign-in"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/new-article"
          element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
