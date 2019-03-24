const Router = require('express').Router()

const movies = require('./Movies')
const sessions = require('./Sessions')

// add Routes as params
Router.use(movies, sessions)

module.exports = Router
