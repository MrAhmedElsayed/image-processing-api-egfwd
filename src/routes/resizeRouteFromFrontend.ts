import express from 'express'
import resizeImage from '../utilities/resizeFrontend'
import { base64ToBufferOnfly } from '../utilities/imageToBuffer'

const resizeRouteFromFrontend = express.Router()

// get base64 string from image and resize with sharp
resizeRouteFromFrontend.post(
  '/',
  function (req: express.Request, res: express.Response): void {
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
  }
)

export default resizeRouteFromFrontend
