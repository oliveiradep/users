const moment = require('moment')

const repository = require('../database/UserRepository.js')

module.exports = () => ({
    create: async (body) => {
        try {
            const user = await repository().create(body)

            if ((user.firstName === undefined || user.firstName === null) && (user.lastName === undefined || user.lastName === null)) {
                var fullName = undefined
            } else {
                var fullName_aux = user.firstName + ' ' + user.lastName
                var fullName = fullName_aux.replace("undefined", "").trim()
            }

            if (user.birthDate === undefined) {
                var age = undefined
            } else {
                var age = moment().utcOffset(2).format('YYYY') - moment(user.birthDate).utcOffset(2).format('YYYY')
            }

            const response = {
                id: user._id,
                email: user.email,
                fullName: fullName,
                age: age
            }

            return response
        } catch (err) {
            throw err
        }
    },

    find: async (query) => {
        try {
            const users = await repository().find(query)

            let response = []

            users.forEach(user => {
                if ((user.firstName === undefined || user.firstName === null) && (user.lastName === undefined || user.lastName === null)) {
                    var fullName = undefined
                } else {
                    var fullName_aux = user.firstName + ' ' + user.lastName
                    var fullName = fullName_aux.replace("undefined", "").trim()
                }

                if (user.birthDate === undefined || user.birthDate === null) {
                    var age = undefined
                } else {
                    var age = moment().utcOffset(2).format('YYYY') - moment(user.birthDate).utcOffset(2).format('YYYY')
                }

                user = {
                    id: user._id,
                    email: user.email,
                    fullName: fullName,
                    age: age
                }

                response.push(user)
            })

            return response
        } catch (err) {
            throw err
        }
    },

    findById: async (id) => {
        try {
            const user = await repository().findById(id)

            if (!user) throw Error('404')

            if ((user.firstName === undefined || user.firstName === null) && (user.lastName === undefined || user.lastName === null)) {
                var fullName = undefined
            } else {
                var fullName_aux = user.firstName + ' ' + user.lastName
                var fullName = fullName_aux.replace("undefined", "").trim()
            }

            if (user.birthDate === undefined || user.birthDate === null) {
                var age = undefined
            } else {
                var age = moment().utcOffset(2).format('YYYY') - moment(user.birthDate).utcOffset(2).format('YYYY')
            }

            const response = {
                id: user._id,
                email: user.email,
                fullName: fullName,
                age: age
            }

            return response
        } catch (err) {
            throw err
        }
    },

    findByIdAndUpdate: async (id, body, query) => {
        try {
            const user = await repository().findByIdAndUpdate(id, body, query)

            if (!user) throw Error('404')

            if ((user.firstName === undefined || user.firstName === null) && (user.lastName === undefined || user.lastName === null)) {
                var fullName = undefined
            } else {
                var fullName_aux = user.firstName + ' ' + user.lastName
                var fullName = fullName_aux.replace("undefined", "").trim()
            }

            if (user.birthDate === undefined || user.birthDate === null) {
                var age = undefined
            } else {
                var age = moment().utcOffset(2).format('YYYY') - moment(user.birthDate).utcOffset(2).format('YYYY')
            }

            const response = {
                id: user._id,
                email: user.email,
                fullName: fullName,
                age: age
            }

            return response
        } catch (err) {
            throw err
        }
    },

    findByIdAndRemove: async (id) => {
        try {
            const user = await repository().findById(id)

            if (user === null || user.birthDate === undefined) {
                return await repository().findByIdAndRemove(id)
            } else {
                const age = moment().utcOffset(2).format('YYYY') - moment(user.birthDate).utcOffset(2).format('YYYY')
                if (age >= 30) {
                    return await repository().findByIdAndRemove(id)
                } else {
                    throw Error('422')
                }
            }
        } catch (err) {
            throw err
        }
    }
})