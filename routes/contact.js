const express = require('express')
const contactController = require('../controllers/contact')

const router = express.Router()

router.route('/').post(contactController.send)

module.exports = router
