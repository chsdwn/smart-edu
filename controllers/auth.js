const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const Course = require('../models/course')
const User = require('../models/user')

exports.create = async (req, res) => {
  try {
    await User.create(req.body)
    res.status(201).redirect('/login')
  } catch {
    const { errors } = validationResult(req)
    req.flash('error', errors?.map((error) => error.msg).join(' ') || 'An error occured.')
    res.status(400).redirect('/register')
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      req.flash('error', 'User is not exists.')
      return res.status(400).redirect('/login')
    }

    const isSame = await bcrypt.compare(password, user.password)
    if (isSame) {
      req.session.userID = user._id
      return res.status(200).redirect('/dashboard')
    }

    req.flash('error', 'Email or password is wrong.')
    res.status(400).redirect('/login')
  } catch (err) {
    res.status(400).send(err.message)
  }
}

exports.logout = async (req, res) => {
  try {
    await req.session.destroy()
    res.redirect('/')
  } catch (err) {
    res.status(400).send(err.message)
  }
}

exports.delete = async (req, res) => {
  try {
    const userId = req.params.id
    const user = await User.findByIdAndRemove(userId)
    if (user.role === 'teacher') {
      await Course.deleteMany({ user: userId })
    }

    req.flash('success', 'User has been deleted successfully.')
    res.status(200).redirect('/dashboard')
  } catch {
    req.flash('error', 'An error occured')
    res.status(400).redirect('/dashboard')
  }
}
