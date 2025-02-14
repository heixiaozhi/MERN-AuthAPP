const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body
  // 检查表单数据不为空
  if (!name || !password || !email) {
    res.status(400)
    throw new Error('表单数据不能为空')
  }

  // 查找集合中是否存在该用户
  const user = await User.findOne({ email: req.body.email })
  if (user) {
    res.status(400)
    throw new Error('用户已存在')
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // 创建用户
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  })
  const saveUser = await newUser.save()
  if (saveUser) {
    res.status(201).json({
      _id: saveUser.id,
      name: saveUser.name,
      email: saveUser.email,
      token: generateToken(saveUser.id),
    })
  } else {
    res.status(400)
    res.json('错误的用户数据')
  }
})

// @desc    Auth Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // 寻找用户
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    })
  } else {
    res.status(400)
    throw new Error('用户信息错误')
  }
})

// @desc    Get user
// @route   get /api/users/me
// @access  Public
const getMe = asyncHandler(async (req, res) => {
  const { _id, email, name } = await User.findById(req.user.id)

  res.status(200).json({
    id: _id,
    name,
    email,
  })
})

// 生成 JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // 有效期
    expiresIn: '30d',
  })
}

module.exports = { register, loginUser, getMe }
