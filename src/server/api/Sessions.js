const db = require('../db')
const router = require('express').Router()
const moment = require('moment')
const withoutTime = require('../helpers/without-time')

let actualSessions = []

function getSessionMoviesId (dates) {
  let startDate = moment(dates.startDate).valueOf()
  let endDate = dates.endDate ? moment(dates.endDate).valueOf() : moment(dates.startDate).valueOf()

  actualSessions = db.get('sessions').filter(item => {
    let sessionDate = moment(item.sessionDate).valueOf()
    return (startDate <= sessionDate && sessionDate <= endDate)
  }).value()

  return [...new Set(actualSessions.map(item => item.movieId))]
}

function getMoviesWithSessions (arrOfIds) {
  let moviesWithSession = []
  arrOfIds.forEach(item => {
    moviesWithSession.push(db.get('movies').find({ id: Number(item) }).value())
  })
  return moviesWithSession
}

function getSessionsGroups (movieId) {
  let groups = actualSessions
    .filter(item => {
      return (item.movieId === Number(movieId))
    })
    .reduce((groups, item) => {
      const date = withoutTime(item.sessionDate).valueOf()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(item)
      return groups
    }, {})

  return Object.keys(groups).map((date) => {
    return groups[date]
  })
}

function getSessionsbyParams (movieId, date) {
  let currDate = moment(date).valueOf()
  let endOfCurrDate = moment(date).endOf('day').valueOf()

  return db.get('sessions').filter(item => {
    let sessionDate = moment(item.sessionDate).valueOf()
    return (item.movieId === movieId && currDate <= sessionDate && sessionDate <= endOfCurrDate)
  }).value()
}

router.get('/sessions/getsessionsgroups/:id', (req, res) => {
  res.json(getSessionsGroups(req.params.id))
})

router.post('/sessions/getsessionsmovies', (req, res) => {
  let dates = req.body.dates
  let moviesWithSession = getSessionMoviesId(dates)
  res.json(getMoviesWithSessions(moviesWithSession))
})

router.get('/sessions/getbyid/:id', (req, res) => {
  res.json(db.get('sessions').find({ id: Number(req.params.id) }).value())
})

router.post('/sessions/getcurrmoviesessions', (req, res) => {
  let movieId = req.body.movieId
  let date = req.body.date

  res.json(getSessionsbyParams(movieId, date))
})

module.exports = router
