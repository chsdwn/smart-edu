const MongoStore = require('connect-mongo')
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')

const categoryRouter = require('./routes/category')
const contactRouter = require('./routes/contact')
const courseRouter = require('./routes/course')
const pageRouter = require('./routes/page')
const userRouter = require('./routes/user')

const CONNECTION_STRING = 'mongodb://localhost/smart-edu'
mongoose.connect(CONNECTION_STRING)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err.message))

global.userID = null

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SECRET || 'DUMMY_SECRET',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: CONNECTION_STRING })
}))
app.use('*', (req, res, next) => {
  global.userID = req.session.userID
  next()
})

app.use('/', pageRouter)
app.use('/categories', categoryRouter)
app.use('/contact', contactRouter)
app.use('/courses', courseRouter)
app.use('/users', userRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
