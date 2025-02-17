import axios from 'axios'

const API_URL = '/api/users'

const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  // 储存在本地
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const login = async (userData) => {
  // axios 会自动抛出错误
  const response = await axios.post(API_URL + '/login', userData)

  // 储存在本地
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const logout = async () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
