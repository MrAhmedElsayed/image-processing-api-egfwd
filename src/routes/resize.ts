import express from 'express'
import sharp from 'sharp'
import {
  ImageDataValidator,
  getFileExtension,
} from '../utilities/validateImageInputs'
import fs from 'fs'
import createOrReturnDirectory from '../utilities/filesManage'

const resizeRouter = express.Router()

// Router resize the image and verify the image information from the file name and is
// the width and height a correct number and then send the resized image
resizeRouter.get('/', async (req: express.Request, res: express.Response) => {
  // check if output directory exists
  const outputDirectory = await createOrReturnDirectory('./public/thumbnails/')

  const file_name = req.query.file_name as string
  const width = req.query.width as string
  const height = req.query.height as string
  const imageExtension = await getFileExtension(file_name)

  const inputsStatus = ImageDataValidator(file_name, width, height)

  console.log(inputsStatus)

  if (inputsStatus === 'SUCCESS') {
    // check if the image have extention
    const imageExtentionClean = getFileExtension(file_name)
    if (imageExtentionClean.length === 0) {
      // send when the image name, width and height are not valid, or image have no extention
      res.status(400).send('inputesMissing')
    } else {
      // check if the file exists in demo-images directory
      const fileExists = fs.existsSync(`./public/demo-images/${file_name}`)

      if (fileExists) {
        const image = await sharp(`./public/demo-images/${file_name}`)
          .resize({
            width: parseInt(width),
            height: parseInt(height),
          })
          .toBuffer()
          .then((data) => {
            fs.writeFileSync(
              `${outputDirectory}${file_name}_${width}_X_${height}.${imageExtension}`,
              data
            )
            return res
              .send(
                '<img alt="Resized Image" src="data:image/png;base64,' +
                  data.toString('base64') +
                  '" />'
              )
              .status(200)
          })
      } else {
        return res.status(404).send('fileNotFound')
      }
    }
  } else {
    res.status(400).send('Image name, width and height are required')
  }
})

export default resizeRouter
