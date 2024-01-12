import { Route, Routes } from 'react-router-dom'

import Header from '../Header/Header'
import PostList from '../HoumePage/PostList'
import Slug from '../Slug/Slug'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/articles" element={<PostList />} />
        <Route path="/articles/post/:slug" element={<Slug />} />
      </Routes>
    </>
  )
}

export default App
