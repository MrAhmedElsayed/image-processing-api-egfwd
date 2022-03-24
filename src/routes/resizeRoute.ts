import express from 'express'
import resizeImage from '../utilities/resize'

const resizeRoute = express.Router()

// get base64 string from image and resize with sharp
resizeRoute.post('/', function (req, res) {
  // console.log(req.body);
  const base64Image = `${req.body.imageFile}`
  const parts = base64Image.split(';')
  // const mimType = parts[0].split(':')[1]
  const imageData = parts[1].split(',')[1]
  const img = Buffer.from(imageData, 'base64')

  // resize image
  resizeImage(
    img,
    req.body.width,
    req.body.height,
    req.body.imageFileName,
    req.body.imageExtension
  ).then((data) => {
    res.send(data).status(200)
  }).catch((err) => {
    res.send(err).status(500)
  })
})

export default resizeRoute
