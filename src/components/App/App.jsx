/* eslint-disable react/jsx-wrap-multilines */
import { Route, Routes } from 'react-router-dom'

import Header from '../Header/Header.jsx'
import PostList from '../PostList/PostList.jsx'
import Slug from '../Slug/Slug.jsx'
import SignIn from '../SignIn/SignIn.jsx'
import SignUp from '../SignUp/SignUp.jsx'
import PublicRoute from '../../hooks/PublicRoute.js'
import PrivateRoute from '../../hooks/PrivateRoute.js'
import Profile from '../Profile/Profile.jsx'

function App() {
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
