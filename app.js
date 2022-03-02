const express = require('express')
const mongoose = require('mongoose')

const categoryRouter = require('./routes/category')
const courseRouter = require('./routes/course')
const pageRouter = require('./routes/page')

mongoose.connect('mongodb://localhost/smart-edu')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err.message))

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', pageRouter)
app.use('/categories', categoryRouter)
app.use('/courses', courseRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
