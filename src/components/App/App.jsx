/* eslint-disable react/jsx-wrap-multilines */
import { Route, Routes } from 'react-router-dom'

import Header from '../Header/Header.jsx'
import PostList from '../HoumePage/PostList.jsx'
import Slug from '../Slug/Slug.jsx'
import SignIn from '../SignIn/SignIn.jsx'
import SignUp from '../SignUp/SignUp.jsx'
import PrivateRoute from '../PrivateRoute.js'

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
            <PrivateRoute>
              <SignIn />
            </PrivateRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PrivateRoute>
              <SignUp />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
