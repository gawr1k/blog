import { useSelector } from 'react-redux'

export default function useAuth() {
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
