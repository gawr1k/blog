import { Navigate } from 'react-router-dom'

import useAuth from '../hooks/use-auth'

function PublicRoute({ children }) {
  const { isAuth } = useAuth()
  return isAuth ? <Navigate to="/profile" /> : children
}

export default PublicRoute
