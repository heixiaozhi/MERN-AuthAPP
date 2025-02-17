import axios from 'axios'

const API_URL = '/api/goals'

// 创建一个新的goal
const createGoal = async (goal, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, { text: goal }, config)

  return response.data
}

// 获取所有的goal
const getGoals = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)

  return response.data
}

const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + `/${goalId}`, config)

  return response.data
}

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
}

export default goalService
