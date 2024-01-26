import { Navigate } from 'react-router-dom'

import useAuth from '../hooks/use-auth'
import { PATH_ARTICLE } from '../routes'

function PrivateRoute({ children }) {
  const { isAuth } = useAuth()
  return isAuth ? children : <Navigate to={PATH_ARTICLE} />
}

export default PrivateRoute
