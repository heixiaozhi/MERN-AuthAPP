const express = require('express')
const {
  register,
  loginUser,
  getMe,
} = require('../controllers/usersControllers')

const router = express.Router()

// 应用权限中间件
const authenticateToken = require('../middleware/authMiddleware')

router.post('/', register)
router.post('/login', loginUser)
router.get('/me', authenticateToken, getMe)

module.exports = router
