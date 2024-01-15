/* eslint-disable no-undef */
import { useSelector } from 'react-redux'

const useAuth = () => {
  // eslint-disable-next-line object-curly-newline
  const { email, token, username } = useSelector((state) => state.user.user)

  return {
    isAuth: !!email,
    email,
    token,
    username,
  }
}

export default useAuth
