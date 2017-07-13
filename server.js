const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const index = require('./routes/index')
require('dotenv').config()

mongoose.connect('mongodb://localhost/ketemu-backend')
console.log('^^^^^^')
app.set('port', process.env.PORT || 3000)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(logger('dev'))

app.use('/', index)

app.listen(app.get('port'), () => {
    console.log('Listen on port: '+app.get('port'));
})