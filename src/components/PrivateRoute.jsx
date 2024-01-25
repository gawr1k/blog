import { Navigate } from 'react-router-dom'

import useAuth from '../hooks/use-auth'

function PrivateRoute({ children }) {
  const { isAuth } = useAuth()
  return isAuth ? children : <Navigate to="/articles" />
}

export default PrivateRoute
