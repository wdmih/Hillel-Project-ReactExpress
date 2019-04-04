const Router = require('express').Router()

const movies = require('./Movies')
const sessions = require('./Sessions')
const order = require('./Order')

// add Routes as params
Router.use(movies, sessions, order)

module.exports = Router
