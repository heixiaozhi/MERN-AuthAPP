import { useSelector } from 'react-redux'

function useAuth() {
  const user = useSelector((state) => state.auth)
  return { user }
}
export default useAuth
