const mongoose = require('mongoose')
const Schema = mongoose.Schema

let meetupSchema = new Schema({
    title: String,
    description: String,
    time: Date,
    typePlaces: {
        type: String,
        enum: ['coworking space', 'library', 'bar', 'park', 'restaurant', 'hotel', 'coffee shop', 'shopping mall']
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    participants: [{
      user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
      },
      status: {
        type: String,
        default: 'pending'
      }
    }],
    status: {
        type: String,
        default: 'TBA'
    },
    location60: [String],
    location30: [String],
    location15: [String],
    createdDate: {
        type: Date,
        default: Date.now()
    },
    updatedDate: {
        type: Date,
        default: Date.now()
    }
})

let Meetup = mongoose.model('Meetup', meetupSchema)
module.exports = Meetup