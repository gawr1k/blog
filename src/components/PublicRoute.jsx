import { Navigate } from 'react-router-dom'

import useAuth from '../hooks/use-auth'
import { PATH_PROFILE } from '../routes'

function PublicRoute({ children }) {
  const { isAuth } = useAuth()
  return isAuth ? <Navigate to={PATH_PROFILE} /> : children
}

export default PublicRoute
