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
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
})

userSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) return next()

  bcrypt.hash(user.password, 10, (error, hash) => {
    if (error) console.error(error.message)

    user.password = hash
    next()
  })
})

const User = mongoose.model('User', userSchema)

module.exports = User
