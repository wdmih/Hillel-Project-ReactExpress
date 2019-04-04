const db = require('../db')
const router = require('express').Router()
const moment = require('moment')

// get 30 days sessions
function getSessions () {
  let currDate = moment().valueOf()
  let monthFromCurr = moment().add(1, 'months').valueOf()

  return db.get('sessions').filter(item => {
    let sessionDate = moment(item.sessionDate).valueOf()
    return (currDate <= sessionDate && sessionDate <= monthFromCurr)
  }).value()
}

// get list of movies id which has session
function getSessionMoviesId (arr) {
  return [...new Set(arr.map(item => item.movieId))]
}

// get list of movies which has sessions
function getMoviesWithSessions (arrOfIds) {
  let moviesWithSession = []
  arrOfIds.forEach(item => {
    moviesWithSession.push(db.get('movies').find({ id: Number(item) }).value())
  })
  return moviesWithSession
}

// get sessions by movieId
function getSessionsbyParams (movieId) {
  let currDate = moment().valueOf()
  let endOfCurrDate = moment().endOf('day').valueOf()

  return db.get('sessions').filter(item => {
    let sessionDate = moment(item.sessionDate).valueOf()
    return (item.movieId === Number(movieId) && currDate <= sessionDate && sessionDate <= endOfCurrDate)
  }).value()
}

router.get('/sessions/getSessions', (req, res) => {
  res.json(getSessions())
})

router.get('/sessions/getSessionById/:id', (req, res) => {
  res.json(db.get('sessions').find({ id: Number(req.params.id) }).value())
})

router.get('/sessions/getSessionsMovies', (req, res) => {
  let moviesWithSession = getSessionMoviesId(getSessions())
  res.json(getMoviesWithSessions(moviesWithSession))
})

router.get('/sessions/getCurMovieSession/:id', (req, res) => {
  let movieId = req.params.id
  res.json(getSessionsbyParams(movieId))
})

module.exports = router
