import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import useAuth from '../hooks/use-auth'
import { PATH_ARTICLE } from '../routes'
import { selectStatus } from '../store/slices/loginSlice'

function PrivateRoute({ children }) {
  const status = useSelector(selectStatus)

  const { isAuth } = useAuth()
  if (status !== 'succeeded') {
    return null
  }

  return isAuth ? children : <Navigate to={PATH_ARTICLE} />
}

export default PrivateRoute
