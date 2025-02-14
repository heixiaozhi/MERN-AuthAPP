// 捕获异步错误中间件
const asyncHandler = require('express-async-handler')

// @desc    Get goals
// @route   GET /api/goals
// @access  private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get goals' })
})

// @desc    Set goals
// @route   POST /api/goals
// @access  private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('You need a text...')
  }
  res.status(200).json({ message: 'Create goal' })
})

// @desc    Update goals
// @route   PUT /api/goals/:id
// @access  private
const updateGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Put goal ${req.params.id}` })
})

// @desc    Delete goals
// @route   Delete /api/goals/:id
// @access  private
const deleteGoals = asyncHandler(async (req, res) => {
  res.json({ message: `Delete goal ${req.params.id}` })
})

module.exports = { getGoals, setGoals, updateGoals, deleteGoals }
