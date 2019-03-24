module.exports = function withoutTime (date) {
  var d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}
