const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const index = require('./routes/index')
require('dotenv').config()

// mongoose.connect('mongodb://localhost/ketemu-backend')

let db_config = {
    development: 'mongodb://localhost/ketemu-backend',
    test: 'mongodb://localhost/ketemu-backend-test'
}

var app_env = app.settings.env
console.log('------------ app_env: ', app_env);

mongoose.connect(db_config[app_env], (err, res) => {
    console.log('Connect to database' + db_config[app_env]);
});

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(logger('dev'))

app.use('/', index)

app.listen(app.get('port'), () => {
    console.log('Listen on port: '+app.get('port'));
})

module.exports = app