const PersonalSpace = require('../models/PersonalSpace')
const PersonalSpacePageList = require('../models/PersonalSpacePageList')
const { sendResponse } = require('./common')

// 往某个个人空间下 插入路由数据
exports.addPersonalSpacePages = async (req, res) => {
  const { spaceId, content, moduleName, path, pid, title, type } = await req.json();
  try {
    const personalSpace = await PersonalSpace.findById(spaceId);
    if (!personalSpace) {
      return sendResponse(res, 400, '未找到该空间')
    }
    const newPage = new PersonalSpacePageList({
      content, moduleName, path, pid, title, type, children: []
    });
    
    if (pid === 0) {
      // If pid is 0, add directly to pageList of the PersonalSpace
      personalSpace.pageList.push(newPage)
    } else {
      const parentPage = personalSpace.pageList.id(pid); // Use Mongoose's id method to find subdocument
      if (parentPage) {
        parentPage.children.push(newPage);
      } else {
        return sendResponse(res, 400, '未找到对应的父节点')
      }
    }

    await personalSpace.save();
    sendResponse(res, 200, '操作成功！')
  } catch (error) {
    sendResponse(res, 500, error, '操作失败～')
  }
}

// 修改某个空间下的路由数据
exports.updatePersonalSpacePages = async (req, res) => {
  const pageData = await req.json();
  const { spaceId, pageId } = pageData;
  try {
    // 查找指定的 PersonalSpace
    const space = await PersonalSpace.findById(spaceId);
    if (!space) {
        return sendResponse(res, 400, '未找到该空间')
    }
    // 查找并更新 pageList 中的指定页面
    let pageUpdated = false;
    const updatePage = (pages) => {
        pages.forEach(page => {
            if (page?._id?.equals(pageId)) {
              const newObj = JSON.parse(JSON.stringify({
                ...pageData,
                spaceId: undefined,
                pageId: undefined
              }))
              Object.assign(page, newObj); // 更新页面数据
              pageUpdated = true;
            }
            if (page.children && page.children.length > 0) {
                updatePage(page.children); // 递归搜索子页面
            }
        });
    };
    updatePage(space.pageList);
    if (!pageUpdated) {
      return sendResponse(res, 400, '未找到该路由')
    }
    await space.save(); // 保存更新
    sendResponse(res, 200, '操作成功！')
  } catch (error) {
    sendResponse(res, 500, error, '操作失败～')
  }
}

// 删除子路由数据
exports.deletePersonalSpacePage = async (req, res) => {
  const { spaceId, pageId } = req.params;
    try {
      const space = await PersonalSpace.findById(spaceId);
      if (!space) {
        return sendResponse(res, 400, '未找到该空间')
      }
      // 递归删除指定页面
      const resData = removePage(space.pageList, pageId);
      if (!resData.found) {
        return sendResponse(res, 400, '未找到该路由')
      }
      await space.save();
      sendResponse(res, 200, '删除成功！')
    } catch (error) {
      sendResponse(res, 500, error, '删除失败～')
    }
}

// 递归删除函数
function removePage(pages, pageId) {
  let found = false;
  let indexToRemove = -1;

  pages.forEach((page, index) => {
      if (page._id.toString() === pageId) {
          indexToRemove = index;
          found = true;
      }
  });

  // 如果找到，删除
  if (indexToRemove !== -1) {
      pages.splice(indexToRemove, 1);
      return { found: true };
  }

  // 否则，递归子页面
  pages.forEach(page => {
      if (page.children && page.children.length > 0) {
          const result = removePage(page.children, pageId);
          if (result.found) {
              found = true;
          }
      }
  });

  return { found };
}