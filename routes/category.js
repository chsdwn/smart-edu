const express = require('express')
const categoryController = require('../controllers/category')

const router = express.Router()

router.route('/').post(categoryController.create)
router.route('/:id').delete(categoryController.delete)

module.exports = router
