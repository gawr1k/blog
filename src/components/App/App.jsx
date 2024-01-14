import { Route, Routes } from 'react-router-dom'

import Header from '../Header/Header.jsx'
import PostList from '../HoumePage/PostList.jsx'
import Slug from '../Slug/Slug.jsx'
import SignIn from '../SignIn/SignIn.jsx'
import SignUn from '../SignUp/SignUp.jsx'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/articles" element={<PostList />} />
        <Route path="/articles/post/:slug" element={<Slug />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUn />} />
        <Route path="/profile" element={<Slug />} />
      </Routes>
    </>
  )
}

export default App
