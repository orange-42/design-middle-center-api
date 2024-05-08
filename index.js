const HyperExpress = require('hyper-express')
const mongoose = require('mongoose')
const cors = require('cors');
const helmet = require('helmet');


// 根据环境加载不同的 dotenv 配置
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const personalSpaceRoutes = require('./routes/personalSpaceRoutes')
const personalSpacePagesRoutes = require('./routes/personalSpacePagesRoutes')
const connectDatabase = require('./config/db')

// Database connection
connectDatabase();

const server = new HyperExpress.Server()
server.use(cors());
server.use(helmet());

// Routes
server.use('/api', personalSpaceRoutes);
server.use('/api', personalSpacePagesRoutes);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))