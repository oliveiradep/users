const express = require('express')

const schema = require('./UserSchema.js')
const service = require('../application/UserService.js')
const constants = require('../utils/Constants.js')

const router = express.Router()

router.post('/', async (req, res) => {
        try {
            var {error} = schema().headers.validate(req.headers)
            if (error) return res.status(415).send({message: error.details[0].message})

            var {error} = schema().post.validate(req.body)
            if (error) return res.status(400).send({message: error.details[0].message})

            const response = await service().create(req.body)

            return res.status(201).send(response)
        } catch (err) {
            console.log(err)
            if (err.code === constants().DUPLICATE_KEY_ERROR_CODE) return res.status(422).send()
            return res.status(500).send()
        }
    }
)

router.get('/', async (req, res) => {
        try {
            const response = await service().find(req.query)
            return res.status(200).send(response)
        } catch (err) {
            console.log(err)
            return res.status(500).send()
        }
    }
)

router.get('/:id', async (req, res) => {
        try {
            const response = await service().findById(req.params.id)
            return res.status(200).send(response)
        } catch (err) {
            console.log(err.message)
            if (err.message === '404') return res.status(404).send()
            return res.status(500).send()
        }
    }
)

router.put('/:id', async (req, res) => {
        try {
            var {error} = schema().headers.validate(req.headers)
            if (error) return res.status(415).send({message: error.details[0].message})

            var {error} = schema().put.validate(req.body)
            if (error) return res.status(400).send({message: error.details[0].message})

            if (!req.body.firstName) {
                req.body.firstName = null
            }

            if (!req.body.lastName) {
                req.body.lastName = null
            }

            if (!req.body.birthDate) {
                req.body.birthDate = null
            }

            const response = await service().findByIdAndUpdate(req.params.id, req.body, {upsert: true, new: true})

            return res.status(200).send(response)
        } catch (err) {
            console.log(err)
            if (err.code === constants().DUPLICATE_KEY_ERROR_CODE) return res.status(422).send()
            return res.status(500).send()
        }
    }
)

router.patch('/:id', async (req, res) => {
        try {
            var {error} = schema().headers.validate(req.headers)
            if (error) return res.status(415).send({message: error.details[0].message})

            var {error} = schema().patch.validate(req.body)
            if (error) return res.status(400).send({message: error.details[0].message})

            const response = await service().findByIdAndUpdate(req.params.id, req.body, {new: true})

            return res.status(200).send(response)
        } catch (err) {
            console.log(err)
            if (err.code === constants().DUPLICATE_KEY_ERROR_CODE) return res.status(422).send()
            if (err.message === '404') return res.status(404).send()
            return res.status(500).send()
        }
    }
)

router.delete('/:id', async (req, res) => {
        try {
            await service().findByIdAndRemove(req.params.id)
            return res.status(204).send()
        } catch (err) {
            console.log(err.message)
            if (err.message === '422') return res.status(422).send()
            return res.status(500).send()
        }
    }
)

router.post('*', function (req, res) {
    /*deprecated*/
    res.send('', 405)
    //express deprecated res.send(body, status): Use res.status(status).send(body) instead
})

router.get('*', function (req, res) {
    /*deprecated*/
    res.send('', 405)
    //express deprecated res.send(body, status): Use res.status(status).send(body) instead
})

router.put('*', function (req, res) {
    /*deprecated*/
    res.send('', 405)
    //express deprecated res.send(body, status): Use res.status(status).send(body) instead
})

router.patch('*', function (req, res) {
    /*deprecated*/
    res.send('', 405)
    //express deprecated res.send(body, status): Use res.status(status).send(body) instead
})

router.delete('*', function (req, res) {
    /*deprecated*/
    res.send('', 405)
    //express deprecated res.send(body, status): Use res.status(status).send(body) instead
})

module.exports = app => app.use('/users', router)