var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp)

var should = chai.should();
let server = require('../server')
let User = require('../models/user')

var idUser = ''
describe('user', () => {

  after(done => {
    User.remove({},(error) => {
      done()
    })
  })

  describe('POST -create user', () => {
    it('should ceate new user', (done) => {
      chai.request(server)
      .post('/signup')
      .send({
        name: "Butet Silaen",
        username: "butet",
        password: "butet",
        email: "butet@gmail.com"
      })
      .end((error, res) => {
        res.should.have.status(200)

        res.body.should.be.a('object')

        res.body.should.have.property('data')
        res.body.should.have.property('status')

        res.body.status.should.equal(true)
        res.body.data.should.be.a('object')

        res.body.data.should.have.property('name')
        res.body.data.should.have.property('password')
        res.body.data.should.have.property('email')
        res.body.data.should.have.property('_id')
        res.body.data.should.have.property('updatedDate')
        res.body.data.should.have.property('createdDate')
        res.body.data.should.have.property('officeAddressGeolocation')
        res.body.data.should.have.property('officeAddressName')
        res.body.data.should.have.property('homeAddressGeolocation')
        res.body.data.should.have.property('homeAddressName')
        res.body.data.should.have.property('username')
        
        res.body.data.name.should.equal('Butet Silaen')
        res.body.data.email.should.equal('butet@gmail.com')
        res.body.data.username.should.equal('butet')

        res.body.data.password.should.not.equal('butet')
        done()
      })
    })
  })

  describe('GET - all user', () => {
    it('should get all user', (done) => {
      chai.request(server)
      .get('/allusers')
      .end((error, res) => {

        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.equal(1)

        done()
      })
    })
  })

  describe('POST - login user', () => {
    it('should login user', (done) => {
      chai.request(server)
      .post('/signin')
      .send({
        username: "butet",
        password: "butet"
      })
      .end((error, res) => {
        console.log("******",res.body);

        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message')
        res.body.should.have.property('id')
        res.body.should.have.property('username')
        res.body.should.have.property('token')
        
        res.body.message.should.equal('SignIn success')
        res.body.username.should.equal('butet')

        done()
      })
    })
  })
})