const db = require('../db')
const router = require('express').Router()

router.post('/order/makeOrder/:sesId', (req, res) => {
  let sesId = req.params.sesId
  let data = req.body.data
  db.get('sessions')
    .find({ id: Number(sesId) })
    .assign({ hall: data })
    .write()
  res.send('Success')
})

module.exports = router
