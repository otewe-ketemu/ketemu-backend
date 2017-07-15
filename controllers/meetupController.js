const Meetup = require('../models/meetup')
let methods = {}

methods.createMeetup = (req, res) => {
    let newMeetup = new Meetup({
        title: req.body.title,
        description: req.body.description,
        time: req.body.time,
        typePlaces: req.body.typePlaces,
        creator: req.body.creator,
        participants: req.body.participants,
        location60: [],
        location30: [],
        location15: []
    })

    newMeetup.save((err, data) => {
        if (err) res.json({err})
        // console.log('createMeetup success');
        // console.log(data);

        Meetup.findById(data._id)
        .populate('creator participants.user')
        .exec((err, record) => {
            if (err) res.json({err})
            res.json(record)
        })
    })
} //createMeetup

methods.getAllMeetup = (req, res) => {
    Meetup.find({})
    .populate('creator participants.user')
    .exec((err, records) => {
        if (err) res.json({err})
        // console.log('Data all Meetup success');
        // console.log(records);
        res.json(records)
    })
} // getAllMeetup

methods.getDetailMeetup = (req, res) => {
    Meetup.findById(req.params.id)
    .populate('creator participants.user')
    .exec((err, record) => {
        if (err) res.json({err})
        res.json(record)
    })
} //getDetailMeetup

methods.editMeetup = (req, res) => {
    Meetup.findById(req.params.id)
    .exec((error, response) => {
        if (error) res.json({error})
        // console.log('^^^^^^^^^ edit id meetup: ', response._id);

        Meetup.findByIdAndUpdate({
            "_id": response._id
        }, {
            $set: {
                title: req.body.title || response.title,
                description: req.body.description || response.description,
                time: req.body.time || response.time,
                typePlaces: req.body.typePlaces || response.typePlaces,
                participants: req.body.participants || response.participants,
                status: req.body.status || response.status,
                location60: req.body.location60 || response.location60,
                location30: req.body.location30 || response.location30,
                location15: req.body.location15 || response.location15
            }
        }, {
            new: true
        })
        .exec((err, result) => {
            if (err) res.json({err})

            Meetup.findById(result._id)
            .populate('creator participants.user')
            .exec((error, record) => {
                if (error) res.json({error})
                // console.log('Detail Meetup success');
                // console.log(record);
                res.json(record)
                // console.log('edit Meetup success');
            })
        })
    })
} //editMeetup

methods.updateParticipants = (req, res) => {
    Meetup.findById(req.params.id)
    .populate('creator participants.user')
    .exec((err, record) => {
        if (err) res.json({err})
        // console.log('Detail Meetup success');
        // console.log(record);
        record.participants.push(req.body.participants)
        record.save(err => {
            Meetup.findById(req.params.id)
                .populate('creator participants.user')
                .exec((err, record) => {
                    if (err) res.json({err})
                    // console.log('Detail Meetup success');
                    // console.log(record);
                    res.json(record)
                })
        })
    })
} //editParticipants

methods.cancelMeetup = (req, res) => {
    Meetup.findById(req.params.id)
    .populate('creator participants.user')
    .exec((err, record) => {
        if (err) res.json({err})
        // console.log('Detail Meetup success');
        // console.log(typeof record._id);
        record.participants = record.participants.filter(participant => participant._id != req.body.participantId)
        record.save((error, data) => {
            // console.log('data')
            res.send(data)
        })
    })
} //cancelMeetup

methods.finalizeMeetup = (req, res) => {
    Meetup.findById(req.params.id)
    .populate('creator participants.user')
    .exec((err, record) => {
        if (err) res.json({err})
        // console.log('Detail Meetup success');
        // console.log(record);
        record.status = 'upcoming'
        record.save((error, data) => {
            if (error) res.json({error})
            res.json(data)
            // console.log('++++: ', data)
        })
    })
}

methods.deleteMeetupById = (req, res) => {
    Meetup.findByIdAndRemove(req.params.id, (err, record) => {
        if (err) res.json({err})
        // console.log('Delete Meetup success');
        // console.log(record);

        res.json(record)
    })
} //deleteMeetup

module.exports = methods