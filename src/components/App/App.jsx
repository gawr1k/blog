/* eslint-disable react/jsx-wrap-multilines */
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Header from '../Header/Header.jsx'
import PostList from '../PostList/PostList.jsx'
import Slug from '../Slug/Slug.jsx'
import SignIn from '../SignIn/SignIn.jsx'
import SignUp from '../SignUp/SignUp.jsx'
import PublicRoute from '../../hooks/PublicRoute.js'
import PrivateRoute from '../../hooks/PrivateRoute.js'
import Profile from '../Profile/Profile.jsx'
import { setLoginUser } from '../../store/slices/loginSlice.js'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      dispatch(setLoginUser(parsedUser))
    }
  }, [])
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/articles" element={<PostList />} />
        <Route path="/articles/post/:slug" element={<Slug />} />
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
      </Routes>
    </>
  )
}

export default App
