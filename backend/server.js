const express = require('express')
const colors = require('colors')
// 加载环境变量到 process.env中
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

// 链接到数据库
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 定义路由前缀和对应的路由
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// 处理错误
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`)
})
