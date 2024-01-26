import { useSelector } from 'react-redux'

import { selectToken } from '../store/slices/loginSlice.js'

export default function useAuth() {
  const token = useSelector(selectToken)

  return {
    isAuth: !!token,
  }
}
