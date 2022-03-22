import express from 'express'
import path from 'path'

const notFoundRoute = express.Router()

/* GET Error page. */
notFoundRoute.get('/', function (req, res) {
  res.sendFile(path.resolve('src', './views/notfound.html'))
})

export default notFoundRoute
