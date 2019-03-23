const movies = require('../sample-data/movies.json')

const router = require('express').Router()

router.get('/movies', (req, res) => {
  res.json(movies)
})

function checkSlug (slug) {
  let result = null
  if (isNaN(slug)) {
    result = movies.find(item => item.slug === slug)
  } else {
    result = movies.find(item => item.id === Number(slug))
  }
  return result
}

router.get('/movies/:slug', (req, res) => {
  let slug = req.params.slug
  res.json(checkSlug(slug))
})

module.exports = router
