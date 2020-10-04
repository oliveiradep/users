const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err)
        const response = {
            statusCodeError: err.statusCode,
            typeError: err.type,
            messageError: err.message
        }
        return res.status(400).send(response)
    }

    next()
})

require('./adapters/UserController.js')(app)

app.listen(8080)