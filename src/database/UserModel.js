const mongoose = require('./DBConnection')
var uuid = require('node-uuid')

const usersSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    birthDate: {
        type: Date
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

const usersColletion = mongoose.model('users', usersSchema)

module.exports = usersColletion