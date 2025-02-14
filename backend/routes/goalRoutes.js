const express = require('express')
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require('../controllers/goalsControllers')

// 创建一个路由实例
const router = express.Router()
// 应用权限中间件
const authenticateToken = require('../middleware/authMiddleware')

// 路由合并
router
  .route('/')
  .get(authenticateToken, getGoals)
  .post(authenticateToken, setGoals)
router
  .route('/:id')
  .delete(authenticateToken, deleteGoals)
  .put(authenticateToken, updateGoals)

// 导出
module.exports = router
