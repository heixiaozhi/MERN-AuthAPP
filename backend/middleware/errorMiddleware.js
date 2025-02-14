const errorHandler = (err, req, res, next) => {
  // res.statusCode 获取响应状态码
  const statusCode = res.statusCode ? res.statusCode : 500
  res.status(statusCode)

  // 开发环境下返回错误信息
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = { errorHandler }
