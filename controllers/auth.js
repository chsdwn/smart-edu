const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.create = async (req, res) => {
  try {
    await User.create(req.body)
    res.status(201).redirect('/login')
  } catch (err) {
    res.status(400).send(err.message)
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(404).send('User not found')

    const isSame = await bcrypt.compare(password, user.password)
    if (isSame) {
      req.session.userID = user._id
      return res.status(200).redirect('/dashboard')
    }

    res.status(404).send('Email or password is wrong')
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
