var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp)

var should = chai.should();
let server = require('../server')
let User = require('../models/user')
let Meetup = require('../models/meetup')

let idUser = ''
let idMeetup = ''

// NOTE: USER
describe('USER', () => {

  after(done => {
    User.remove({},(error) => {
      done()
    })
  })

  // NOTE: signup
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

        idUser = res.body.data._id

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

  // NOTE: signin
  describe('POST - login user', () => {
    it('should login user', (done) => {
      chai.request(server)
      .post('/signin')
      .send({
        username: "butet",
        password: "butet"
      })
      .end((error, res) => {

        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message')
        res.body.should.have.property('id')
        res.body.should.have.property('username')
        res.body.should.have.property('token')

        res.body.message.should.equal('SignIn success')
        res.body.username.should.equal('butet')

      })
      done()
    })
  })

  // NOTE: allusers
  describe('GET - all user', () => {
    it('should get all user', (done) => {
      chai.request(server)
      .get('/allusers')
      .end((error, res) => {

        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.equal(1)

        res.body[0].name.should.equal('Butet Silaen')
        res.body[0].username.should.equal('butet')
        res.body[0].email.should.equal('butet@gmail.com')

        done()
      })
    })
  })

  // NOTE: detailuser
  describe('DETAIL - detail User', () => {
      it('should detail the User', (done) => {
      chai.request(server)
      .get(`/detailuser/${idUser}`)
      .end((error, res) => {
          // console.log(res.body);

          res.should.have.status(200)
          res.body.should.be.a('object')

          res.body.name.should.equal('Butet Silaen')
          res.body.username.should.equal('butet')
          res.body.email.should.equal('butet@gmail.com')

          done()
      })
      })
  })

  // NOTE: homeaddressgeolocation
  describe('HOME ADDRESS GEOLOCATION - home address geolocation User', () => {
      it('should home address geolocation the User', (done) => {
      chai.request(server)
      .get(`/homeaddressgeolocation/${idUser}`)
      .end((error, res) => {
          // console.log(res.body);

          res.should.have.status(200)
          res.body.should.be.a('array')

          done()
      })
      })
  })

  // NOTE: officeaddressgeolocation
  describe('OFFICE ADDRESS GEOLOCATION - office address geolocation User', () => {
        it('should office address geolocation the User', (done) => {
        chai.request(server)
        .get(`/officeaddressgeolocation/${idUser}`)
        .end((error, res) => {
            // console.log(res.body);

            res.should.have.status(200)
            res.body.should.be.a('array')

            done()
        })
        })
    })

    // NOTE: edituser
    describe('PUT - update User', () => {
        it('should update the User', (done) => {
        chai.request(server)
        .put(`/edituser/${idUser}`)
        .send({
            name: "Ucok Pardamean",
            username: "pardamean",
            password: "pardamean",
            email: "pardamean@gmail.com",
            officeAddressName: "Jalan Sultan Iskandar Muda, No. 55",
            officeAddressGeolocation: [-6.260846, 106.7806537],
            homeAddressName: "Jalan Tanah Kusir 4, No. 10",
            homeAddressGeolocation: [-6.2600141, 106.7793779],
            updatedDate: Date.now()
        })
        .end((error, res) => {

            res.should.have.status(200)
            // console.log(res.body);

            res.body.should.be.a('object')

            res.body.name.should.equal('Ucok Pardamean')
            res.body.username.should.equal('pardamean')
            res.body.email.should.equal('pardamean@gmail.com')
            res.body.officeAddressName.should.equal('Jalan Sultan Iskandar Muda, No. 55')
            res.body.homeAddressName.should.equal('Jalan Tanah Kusir 4, No. 10')
            // res.body.officeAddressGeolocation.should.equal([-6.260846, 106.7806537])
            // res.body.homeAddressGeolocation.should.equal([-6.2600141, 106.7793779])

            res.body.password.should.not.equal('pardamean')

            done()
        })
        })
    })
})

// NOTE: MEETUP
describe('MEETUP', () => {

    after(done => {
        Meetup.remove({},(error) => {
        done()
        })
    })

    // NOTE: createmeetup
    describe('POST -create Meetup', () => {
        it('should ceate new Meetup', (done) => {
        chai.request(server)
        .post('/createmeetup')
        .send({
            title: "Rapat Paripurna",
            description: "Rapat Paripurna bersama para koruptor",
            time: Date.now(),
            typePlaces: "bar",
            participants: [`${idUser}`]
        })
        .end((error, res) => {
            // console.log('+++: ', idUser);
            // console.log(res.body)

            idMeetup = res.body._id

            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('title')
            res.body.should.have.property('description')
            res.body.should.have.property('time')
            res.body.should.have.property('typePlaces')
            res.body.should.have.property('_id')
            res.body.should.have.property('updatedDate')
            res.body.should.have.property('createdDate')
            res.body.should.have.property('location15')
            res.body.should.have.property('location30')
            res.body.should.have.property('location60')
            res.body.should.have.property('status')
            res.body.should.have.property('participants')

            res.body.title.should.equal('Rapat Paripurna')
            res.body.description.should.equal('Rapat Paripurna bersama para koruptor')
            res.body.typePlaces.should.equal('bar')
            res.body.status.should.equal('TBA')

            done()
        })
        })
    })

    // NOTE: allmeetup
    describe('GET - all Meetup', () => {
        it('should get all Meetup', (done) => {
        chai.request(server)
        .get('/allmeetup')
        .end((error, res) => {
            // console.log('all meetup: *** ', res.body)

            res.should.have.status(200)
            res.body.should.be.a('array')
            res.body.length.should.equal(1)

            res.body[0].should.have.property('title')
            res.body[0].should.have.property('description')
            res.body[0].should.have.property('time')
            res.body[0].should.have.property('typePlaces')
            res.body[0].should.have.property('_id')
            res.body[0].should.have.property('updatedDate')
            res.body[0].should.have.property('createdDate')
            res.body[0].should.have.property('location15')
            res.body[0].should.have.property('location30')
            res.body[0].should.have.property('location60')
            res.body[0].should.have.property('status')
            res.body[0].should.have.property('participants')

            res.body[0].title.should.equal('Rapat Paripurna')
            res.body[0].description.should.equal('Rapat Paripurna bersama para koruptor')
            res.body[0].typePlaces.should.equal('bar')
            res.body[0].status.should.equal('TBA')

            done()
        })
        })
    })

    // NOTE: detailmeetup
    describe('DETAIL - detail Meetup', () => {
        it('should detail the Meetup', (done) => {
        chai.request(server)
        .get(`/detailmeetup/${idMeetup}`)
        .end((error, res) => {
            // console.log(res.body);

            res.should.have.status(200)
            res.body.should.be.a('object')

            res.body.should.have.property('title')
            res.body.should.have.property('description')
            res.body.should.have.property('time')
            res.body.should.have.property('typePlaces')
            res.body.should.have.property('_id')
            res.body.should.have.property('updatedDate')
            res.body.should.have.property('createdDate')
            res.body.should.have.property('location15')
            res.body.should.have.property('location30')
            res.body.should.have.property('location60')
            res.body.should.have.property('status')
            res.body.should.have.property('participants')

            res.body.title.should.equal('Rapat Paripurna')
            res.body.description.should.equal('Rapat Paripurna bersama para koruptor')
            res.body.typePlaces.should.equal('bar')
            res.body.status.should.equal('TBA')

            res.body.participants.should.be.a('array')

            done()
        })
        })
    })

    // NOTE: editmeetup
    describe('PUT - update Meetup', () => {
        it('should update the Meetup', (done) => {
        chai.request(server)
        .put(`/editmeetup/${idMeetup}`)
        .send({
            title: "Update Rapat Pers",
            description: "Update Rapat Pers diadakan pada hari Senin",
            time: Date.now(),
            typePlaces: "park",
            participants: [`${idUser}`],
            status: "TBA",
            location60: [],
            location30: [],
            location15: []
        })
        .end((error, res) => {

            res.should.have.status(200)
            // console.log(res.body);

            res.body.should.be.a('object')

            res.body.should.have.property('title')
            res.body.should.have.property('description')
            res.body.should.have.property('time')
            res.body.should.have.property('typePlaces')
            res.body.should.have.property('_id')
            res.body.should.have.property('updatedDate')
            res.body.should.have.property('createdDate')
            res.body.should.have.property('location15')
            res.body.should.have.property('location30')
            res.body.should.have.property('location60')
            res.body.should.have.property('status')
            res.body.should.have.property('participants')

            res.body.title.should.equal('Update Rapat Pers')
            res.body.description.should.equal('Update Rapat Pers diadakan pada hari Senin')
            res.body.typePlaces.should.equal('park')
            res.body.status.should.equal('TBA')

            done()
        })
        })
    })

    // NOTE: updateparticipants
    describe('PUT - update Participants', () => {
        it('should update the Participants', (done) => {
        chai.request(server)
        .put(`/updatepartipants/${idMeetup}`)
        .send({
            participants: [`${idUser}`]
        })
        .end((error, res) => {

            res.should.have.status(200)
            // console.log(res.body);

            res.body.should.be.a('object')

            res.body.should.have.property('title')
            res.body.should.have.property('description')
            res.body.should.have.property('time')
            res.body.should.have.property('typePlaces')
            res.body.should.have.property('_id')
            res.body.should.have.property('updatedDate')
            res.body.should.have.property('createdDate')
            res.body.should.have.property('location15')
            res.body.should.have.property('location30')
            res.body.should.have.property('location60')
            res.body.should.have.property('status')
            res.body.should.have.property('participants')

            res.body.title.should.equal('Update Rapat Pers')
            res.body.description.should.equal('Update Rapat Pers diadakan pada hari Senin')
            res.body.typePlaces.should.equal('park')
            res.body.status.should.equal('TBA')

            done()
        })
        })
    })

    // NOTE: cancelMeetup
    describe('CANCEL - cancel Meetup', () => {
        it('should cancel the Meetup', (done) => {
        chai.request(server)
        .put(`/cancelMeetup/${idMeetup}`)
        .send({
            participants: [`${idUser}`]
        })
        .end((error, res) => {
            // console.log(res.body);

            res.should.have.status(200)
            res.body.should.be.a('object')

            res.body.should.have.property('title')
            res.body.should.have.property('description')
            res.body.should.have.property('time')
            res.body.should.have.property('typePlaces')
            res.body.should.have.property('_id')
            res.body.should.have.property('updatedDate')
            res.body.should.have.property('createdDate')
            res.body.should.have.property('location15')
            res.body.should.have.property('location30')
            res.body.should.have.property('location60')
            res.body.should.have.property('status')
            res.body.should.have.property('participants')

            res.body.title.should.equal('Update Rapat Pers')
            res.body.description.should.equal('Update Rapat Pers diadakan pada hari Senin')
            res.body.typePlaces.should.equal('park')
            res.body.status.should.equal('TBA')

            res.body.participants.should.be.a('array')

            done()
        })
        })
    })

    // NOTE: finalizemeetup
    describe('FINALIZE - finalize Meetup', () => {
        it('should finalize the Meetup', (done) => {
        chai.request(server)
        .put(`/finalizemeetup/${idMeetup}`)
        .send({
            participants: [`${idUser}`]
        })
        .end((error, res) => {
            // console.log(res.body);

            res.should.have.status(200)
            res.body.should.be.a('object')

            res.body.should.have.property('title')
            res.body.should.have.property('description')
            res.body.should.have.property('time')
            res.body.should.have.property('typePlaces')
            res.body.should.have.property('_id')
            res.body.should.have.property('updatedDate')
            res.body.should.have.property('createdDate')
            res.body.should.have.property('location15')
            res.body.should.have.property('location30')
            res.body.should.have.property('location60')
            res.body.should.have.property('status')
            res.body.should.have.property('participants')

            res.body.title.should.equal('Update Rapat Pers')
            res.body.description.should.equal('Update Rapat Pers diadakan pada hari Senin')
            res.body.typePlaces.should.equal('park')
            res.body.status.should.equal('upcoming')

            res.body.participants.should.be.a('array')

            done()
        })
        })
    })

    // NOTE: deletemeetup
    describe('DELETE - delete Meetup', () => {
        it('should delete the Meetup', (done) => {
        chai.request(server)
        .delete(`/deletemeetup/${idMeetup}`)
        .end((error, res) => {
            // console.log(res.body);

            res.should.have.status(200)
            res.body.should.be.a('object')

            res.body.should.have.property('title')
            res.body.should.have.property('description')
            res.body.should.have.property('time')
            res.body.should.have.property('typePlaces')
            res.body.should.have.property('_id')
            res.body.should.have.property('updatedDate')
            res.body.should.have.property('createdDate')
            res.body.should.have.property('location15')
            res.body.should.have.property('location30')
            res.body.should.have.property('location60')
            res.body.should.have.property('status')
            res.body.should.have.property('participants')

            res.body.title.should.equal('Update Rapat Pers')
            res.body.description.should.equal('Update Rapat Pers diadakan pada hari Senin')
            res.body.typePlaces.should.equal('park')
            res.body.status.should.equal('upcoming')

            res.body.participants.should.be.a('array')
            res.body.participants[0].should.equal(idUser)

            done()
        })
        })
    })
})
