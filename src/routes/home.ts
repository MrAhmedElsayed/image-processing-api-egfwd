import express from 'express'
import path from 'path'

const homeRoute = express.Router()

/* GET home page. */
homeRoute.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/home.html'))
})

export default homeRoute
