import { useSelector } from 'react-redux'

const useAuth = () => {
  const { email, token, username } = useSelector((state) => state.user.user)

  return {
    isAuth: !!email,
    email,
    token,
    username,
  }
}

export default useAuth
