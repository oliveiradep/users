const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/nodeuserscrud', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.Promise = global.Promise

module.exports = mongoose