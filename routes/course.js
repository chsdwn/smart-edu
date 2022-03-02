const express = require('express')
const courseController = require('../controllers/course')

const router = express.Router()

router.route('/').get(courseController.getAll)
router.route('/').post(courseController.create)

module.exports = router
