const mongoose = require('mongoose')

/**
 * @description 数据库连接
 */
const connectDatabase = () => {
  const IP = process.env.APP_HYPER_EXPRESS_MONGO_IP // 主机 ip
  const PORT = process.env.APP_HYPER_EXPRESS_MONGO_PORT // 主机端口
  const DB_NAME = process.env.APP_HYPER_EXPRESS_MONGO_DB_NAME // 数据库名
  // 连接配置
  mongoose.connect(`mongodb://${IP}:${PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  // 连接成功
  mongoose.connection.on('connected', () => {
    console.log('连接成功')
  })

  // 连接异常
  mongoose.connection.on('error', (err) => {
    console.log('连接异常:' + err)
  })

  // 连接成功
  mongoose.connection.on('disconnected', () => {
    console.log('连接成功')
  })
}

module.exports = connectDatabase