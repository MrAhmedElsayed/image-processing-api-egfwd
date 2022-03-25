import express from 'express'
import path from 'path'

const homeRoute = express.Router()

/* GET home page. */
homeRoute.get(
  '/',
  function (req: express.Request, res: express.Response): void {
    res.status(200).sendFile(path.resolve('src', './views/home.html'))
  }
)

export default homeRoute
