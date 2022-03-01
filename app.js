const express = require('express')
const pageRouter = require('./routes/page')

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use('/', pageRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
