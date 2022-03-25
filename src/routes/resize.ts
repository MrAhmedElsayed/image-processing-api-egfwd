import express from 'express'
import sharp from 'sharp'
import ImageDataValidator from '../utilities/validateImageInputs'
import fs from 'fs'

const resizeRouter = express.Router()

// Router resize the image and verify the image information from the file name and is
// the width and height a correct number and then send the resized image
resizeRouter.get('/', async (req: express.Request, res: express.Response) => {
  const file_name = req.query.file_name as string
  const width = req.query.width as string
  const height = req.query.height as string
  //    check if the image name, width and height are valid

  if (ImageDataValidator(file_name, width, height, res)) {
    const image = await sharp(`./public/demo-images/${file_name}`)
      .resize({
        width: parseInt(width),
        height: parseInt(height),
      })
      .toBuffer()
      .then((data) => {
        fs.writeFileSync(
          `./public/thumbnails/${file_name}_${width}_X_${height}.png`,
          data
        )
        res.send(
          '<img src="data:image/png;base64,' + data.toString('base64') + '" />'
        )
      })

    res.status(200).send(image)
  }
})

export default resizeRouter
