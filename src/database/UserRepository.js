const users = require('../database/UserModel.js')

module.exports = () => ({
    create: async (body) => {
        try {
            return await users.create(body)
        } catch (err) {
            throw err
        }
    },

    find: async (query) => {
        try {
            return await users.find(query)
        } catch (err) {
            throw err
        }
    },

    findById: async (id) => {
        try {
            return await users.findById(id)
        } catch (err) {
            throw err
        }
    },

    findByIdAndUpdate: async (id, body, query) => {
        try {
            return await users.findByIdAndUpdate(id, body, query)
        } catch (err) {
            throw err
        }
    },

    findByIdAndRemove: async (id) => {
        try {
            return await users.findByIdAndRemove(id)
        } catch (err) {
            throw err
        }
    }
})