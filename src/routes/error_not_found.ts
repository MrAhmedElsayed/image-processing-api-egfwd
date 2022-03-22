import express from 'express'
import path from 'path'

const notFoundRoute = express.Router()

/* GET home page. */
notFoundRoute.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/home.html'))
})

export default notFoundRoute
