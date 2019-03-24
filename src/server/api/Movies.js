const db = require('../db')
const router = require('express').Router()

router.get('/movies', (req, res) => {
  res.json(db.get('movies').value())
})

function checkSlug (slug) {
  let result = null
  if (isNaN(slug)) {
    result = db.get('movies').find({ slug: slug }).value()
  } else {
    result = db.get('movies').find({ id: Number(slug) }).value()
  }
  return result
}

router.get('/movies/:slug', (req, res) => {
  let slug = req.params.slug
  res.json(checkSlug(slug))
})

module.exports = router
