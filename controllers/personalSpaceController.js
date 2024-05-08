const PersonalSpace = require('../models/PersonalSpace')
const { sendResponse } = require('./common')

// 创建个人空间
exports.createPersonalSpace = async (req, res) => {
  try {
    const body = await req.json()
    const personalSpace = new PersonalSpace(body);
    const savedSpace = await personalSpace.save();
    sendResponse(res, 200, '操作成功！')
  } catch (error) {
    sendResponse(res, 500, error)
  }
}

// 修改个人空间的数据
exports.updatePersonalSpace = async (req, res) => {
  const { id, spaceName, desc } = await req.json()
  try {
    // 将文档标记为已删除，而不是实际删除它
    const updatedSpace = await PersonalSpace.findByIdAndUpdate(id, { spaceName, desc }, { new: true });
    if (updatedSpace) {
      sendResponse(res, 200, '修改成功！')
    } else {
      sendResponse(res, 400, '未找到该空间')
    }
  } catch (error) {
    sendResponse(res, 400, e, '删除错误')
  }
}

// 查询 对应工号伙伴的 个人空间数据
exports.getStaffSpace = async (req, res) => {
  const { staffNum, spaceName } = req.query
  if(!staffNum) return sendResponse(res, 400, '工号不能为空')
  try {
    let query = { staffNum, isDeleted: false }
    // 空间名搜索
    if(spaceName) query.spaceName = new RegExp(spaceName, 'i')
    const space = await PersonalSpace.find(query)
  
    if(space) {
      sendResponse(res, 200, space)
    } else {
      sendResponse(res, 200, [])
    }
  } catch(e) {
    sendResponse(res, 500, e, 'Error fetching personal space')
  }
}

// 删除 某条数据 根据 唯一 id （直接删除）
exports.deleteRealPersonalSpace = async (req, res) => {
  const { id } = req.params
  try {
    const deletedSpace = await PersonalSpace.findByIdAndDelete(id)
     if (deletedSpace) {
      sendResponse(res, 200, '删除成功！')
    } else {
      sendResponse(res, 400, '未找到该空间')
    }
  } catch(e) {
    sendResponse(res, 500, e, '删除错误')
  } 
}

// 删除 某条数据 根据 唯一 id （软删除）
exports.deletePersonalSpace = async (req, res) => {
  const { id } = req.params;
  try {
    // 将文档标记为已删除，而不是实际删除它
    const updatedSpace = await PersonalSpace.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (updatedSpace) {
      sendResponse(res, 200, '删除成功！')
    } else {
      sendResponse(res, 200, '未找到该空间')
    }
  } catch (error) {
    sendResponse(res, 500, e, '删除错误')
  }
}

// 通过 空间 id  查询空间
exports.getPersonalSpaceById = async (req, res) => {
  const { spaceId } = req.query
  try {
     const personalSpace = await PersonalSpace.findById(spaceId);
    if (!personalSpace) {
      return sendResponse(res, 400, '未找到该空间')
    }
    sendResponse(res, 200, personalSpace)
  } catch {
    sendResponse(res, 500, '获取数据失败')
  }
}
