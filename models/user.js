const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  }
})

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, (error, hash) => {
    if (error) console.error(error.message)

    this.password = hash
    next()
  })
})

const User = mongoose.model('User', userSchema)

module.exports = User
