const express = require('express')
const courseController = require('../controllers/course')
const roleMiddleware = require('../middlewares/role')

const router = express.Router()

router.route('/').get(courseController.getAll)
router.route('/').post(roleMiddleware(['teacher', 'admin']), courseController.create)
router.route('/enroll/:id').post(courseController.enroll)

module.exports = router
