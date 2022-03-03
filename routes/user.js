const express = require('express')
const { body } = require('express-validator')
const authController = require('../controllers/auth')
const User = require('../models/user')

const router = express.Router()

router.route('/login').post(authController.login)
router.route('/logout').get(authController.logout)
router.route('/signup').post([
  body('name').not().isEmpty().withMessage('Name cannot be empty.'),
  body('email').isEmail().withMessage('Enter a valid mail address.'),
  body('password').not().isEmpty().withMessage('Password cannot be empty.')
    .custom(async (mail) => {
      const user = await User.findOne({ mail })
      if (user) return Promise.reject(new Error('User already exists.'))
    })
], authController.create)

module.exports = router
