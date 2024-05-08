// 通用返回体封装
exports.sendResponse = (res, statusCode, msg, message = '') => {
  res.status(statusCode).json({
      success: statusCode === 200  ? true : false,
      message,
      msg
  });
}
