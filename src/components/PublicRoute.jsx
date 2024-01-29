import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import useAuth from '../hooks/use-auth'
import { PATH_PROFILE } from '../routes'
import { selectStatus } from '../store/slices/loginSlice'

function PublicRoute({ children }) {
  const { isAuth } = useAuth()
  const status = useSelector(selectStatus)

  if (status !== 'succeeded') {
    return null
  }

  return isAuth ? <Navigate to={PATH_PROFILE} /> : children
}

export default PublicRoute
