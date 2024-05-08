const HyperExpress = require('hyper-express');
const router = new HyperExpress.Router();
const { addPersonalSpacePages, updatePersonalSpacePages, deletePersonalSpacePage } = require('../controllers/personalSpacePagesController')

/**
 * @description 往某个空间下 插入路由数据
 * @path /personal-space/pages
 * @method post
 */
router.post('/personal-space/pages', addPersonalSpacePages)

/**
 * @description 修改某个空间下的路由数据
 * @path /personal-space/pages
 * @method put
 */
router.put('/personal-space/pages', updatePersonalSpacePages)


/**
 * @description 删除 某条数据 根据 唯一 id （软删除）
 * @path /personal-space/:spaceId/pages/:pageId
 * @method delete
 */
router.delete('/personal-space/:spaceId/pages/:pageId', deletePersonalSpacePage)

module.exports = router



