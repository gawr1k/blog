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
import NewArticle from '../NewArticle/NewArticle.jsx'
import EditArticle from '../EditArticle/EditArticle.jsx'
import { setLoginUser } from '../../store/slices/loginSlice.js'
import { setCurrentPage } from '../../store/slices/postsSlice.js'

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
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PostList />}>
          <Route path="articles" element={<PostList />} />
        </Route>
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
        <Route
          path="/new-article"
          element={
            <PrivateRoute>
              <NewArticle />
            </PrivateRoute>
          }
        />
        <Route
          path="/articles/:slug/edit"
          element={
            <PrivateRoute>
              <EditArticle />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
