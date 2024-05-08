const HyperExpress = require('hyper-express');
const router = new HyperExpress.Router();
const { createPersonalSpace, updatePersonalSpace, getStaffSpace, deleteRealPersonalSpace, deletePersonalSpace, getPersonalSpaceById } = require('../controllers/personalSpaceController')

/**
 * @description 创建个人空间的数据
 * @path /api/personal-space
 * @method post
 */
router.post('/personal-space', createPersonalSpace)

/**
 * @description 修改个人空间的数据
 * @path /api/personal-space
 * @method put
 */
router.put('/personal-space', updatePersonalSpace)

/**
 * @description 查询 对应工号伙伴的 个人空间数据
 * @path /api/personal-space/staff
 * @method get
 */
router.get('/personal-space/staff', getStaffSpace)

/**
 * @description 通过 id 获取某个空间
 * @path /personal-space/byId
 * @method get
 */
router.get('/personal-space/byId', getPersonalSpaceById)

/**
 * @description 删除 某条数据 根据 唯一 id （软删除）
 * @path /personal-space/:id
 * @method delete
 */
router.delete('/personal-space/:id', deletePersonalSpace)

/**
 * @description 删除 某条数据 根据 唯一 id （直接删除）
 * @path /personal-space/real/:id
 * @method delete
 */
router.delete('/personal-space/real/:id', deleteRealPersonalSpace)


module.exports = router


