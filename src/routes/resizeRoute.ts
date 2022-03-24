import express from 'express'
import resizeImage from '../utilities/resize'
import { base64ToBufferOnfly } from '../utilities/imageToBuffer'

const resizeRoute = express.Router()

// get base64 string from image and resize with sharp
resizeRoute.post('/', function (req, res) {
  const img = base64ToBufferOnfly(req.body.imageFile)
  // resize image
  resizeImage(
    img,
    req.body.width,
    req.body.height,
    req.body.imageFileName,
    req.body.imageExtension
  )
    .then((data) => {
      res.send(data).status(200)
    })
    .catch((err) => {
      res.send(err).status(500)
    })
})

export default resizeRoute
