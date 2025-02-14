// 捕获异步错误中间件
const asyncHandler = require('express-async-handler')

// 数据库表模型
const Goal = require('../models/goalModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  private
const getGoals = asyncHandler(async (req, res) => {
  // 查找数据
  const goals = await Goal.find()
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
  const newGoal = new Goal({ text: req.body.text })
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

  await Goal.deleteOne(goal)

  res.json({ id: req.params.id })
})

module.exports = { getGoals, setGoals, updateGoals, deleteGoals }
