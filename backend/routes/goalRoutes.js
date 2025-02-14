const express = require('express')
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require('../controllers/goalsControllers')

// 创建一个路由实例
const router = express.Router()

// 路由合并
router.route('/').get(getGoals).post(setGoals)
router.route('/:id').delete(deleteGoals).put(updateGoals)

// 导出
module.exports = router
