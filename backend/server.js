const express = require('express')
// 加载环境变量到 process.env中
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 定义路由前缀和对应的路由
app.use('/api/goals', require('./routes/goalRoutes'))

// 处理错误
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`)
})
