const express = require('express')
const path = require('path')
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

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  // 捕获所有未匹配的路由并返回前端页面
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  })
} else {
  app.get('/', (req, res) => {
    res.send('Please set to production')
  })
}

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`)
})
