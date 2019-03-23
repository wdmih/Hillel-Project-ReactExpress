const Router = require('express').Router()

const movies = require('./Movies')

// add Routes as params
Router.use(movies)

module.exports = Router
