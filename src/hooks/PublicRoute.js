import { Navigate } from 'react-router-dom'

import useAuth from './use-auth.js'

function PublicRoute({ children }) {
  const { isAuth } = useAuth()
  return isAuth ? <Navigate to="/articles" /> : children
}

export default PublicRoute
