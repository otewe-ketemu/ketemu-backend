const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        default: Date.now()
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    homeAddressName: {
        type: String,
        default: ''
    },
    homeAddressGeolocation: {
        type: [Number],
        index: '2d',
        sparse: true
    },
    officeAddressName: {
        type: String,
        default: ''
    },
    officeAddressGeolocation: {
        type: [Number],
        index: '2d',
        sparse: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    updatedDate: {
        type: Date,
        default: Date.now()
    }
})

let User = mongoose.model('User', userSchema)
module.exports = User