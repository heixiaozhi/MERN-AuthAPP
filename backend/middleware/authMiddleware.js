const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// 验证 Token 的中间件
const authenticateToken = asyncHandler(async (req, res, next) => {
  let token

  // 认证属性存在获取请求头的token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      // 验证 token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // 从token中获取用户 同时排除密码字段
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('没有权限...')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('没有权限，没有token')
  }
})

module.exports = authenticateToken
