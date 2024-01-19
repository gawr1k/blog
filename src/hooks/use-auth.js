import { useSelector } from 'react-redux'

const useAuth = () => {
  const { email, token, username, image } = useSelector(
    (state) => state.user.user
  )

  return {
    isAuth: !!email,
    email,
    token,
    username,
    image,
  }
}

export default useAuth
