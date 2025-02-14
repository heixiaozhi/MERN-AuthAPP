// 捕获异步错误中间件
const asyncHandler = require('express-async-handler')

// 数据库表模型
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  private
const getGoals = asyncHandler(async (req, res) => {
  // 查找数据
  const goals = await Goal.find({ user: req.user.id })
  res.status(200).json(goals)
})

// @desc    Set goals
// @route   POST /api/goals
// @access  private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('You need a text...')
  }

  // 创建一个实例
  const newGoal = new Goal({ text: req.body.text, user: req.user.id })
  const saveGoal = await newGoal.save()

  res.status(200).json(saveGoal)
})

// @desc    Update goals
// @route   PUT /api/goals/:id
// @access  private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  // id 文档是否存在
  if (!goal) {
    res.status(400)
    throw new Error('用户未找到')
  }

  // 多余的代码，权限验证已经验证过用户是否存在
  // const user = await User.findById(req.user.id)

  // // 检查用户
  // if (!user) {
  //   res.status(401)
  //   throw new Error('用户未找到')
  // }

  // 确保文字和用户是关系正确
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('用户没有权限')
  }

  // 找到对应的goal更新
  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updateGoal)
})

// @desc    Delete goals
// @route   Delete /api/goals/:id
// @access  private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  // id 文档是否存在
  if (!goal) {
    res.status(400)
    throw new Error('用户未找到')
  }

  // 确保文字和用户是关系正确
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('用户没有权限')
  }

  await Goal.deleteOne(goal)

  res.json({ id: req.params.id })
})

module.exports = { getGoals, setGoals, updateGoals, deleteGoals }
