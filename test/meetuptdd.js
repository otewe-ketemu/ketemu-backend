var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp)

var should = chai.should();
let server = require('../server')
let Meetup = require('../models/meetup')


