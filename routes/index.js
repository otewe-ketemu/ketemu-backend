const express = require('express')
const router = express.Router()
let userController = require('../controllers/userController')
let meetupController = require('../controllers/meetupController')

// server is alive
router.get('/', (req, res) => {
  res.send('OTEWE!')
})

// NOTE: user
router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.get('/allusers', userController.getAllUsers)
router.get('/detailuser/:id', userController.getUserById)
router.get('/homeaddressgeolocation/:id', userController.getHomeAddressGeolocation)
router.get('/officeaddressgeolocation/:id', userController.getOfficeAddressGeolocation)
router.put('/edituser/:id', userController.editUser)  // password harus disertakan
router.put('/updateavatar/:id', userController.updateAvatarUrl)
router.delete('/deleteuser/:id', userController.deleteUserById)

// NODE: meetup
router.post('/createmeetup', meetupController.createMeetup)
router.get('/allmeetup', meetupController.getAllMeetup)
router.get('/detailmeetup/:id', meetupController.getDetailMeetup)
router.put('/editmeetup/:id', meetupController.editMeetup)  // password harus disertakan
router.put('/updatepartipants/:id', meetupController.updateParticipants)
router.put('/finalizemeetup/:id', meetupController.finalizeMeetup)
router.put('/cancelMeetup/:id', meetupController.cancelMeetup)
router.delete('/deletemeetup/:id', meetupController.deleteMeetupById)

module.exports = router
