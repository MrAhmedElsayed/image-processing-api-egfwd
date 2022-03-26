import express from 'express'
import { displayErrorAlert } from '../utilities/displayErrorAlert'
import createOrReturnDirectory from '../utilities/filesManage'
import {
  ImageDataValidator,
  getFileExtension,
} from '../utilities/validateImageInputs'
import fs from 'fs'
import sharp from 'sharp'

const resizeRouter = express.Router()

resizeRouter.get('/', async (req: express.Request, res: express.Response) => {
  // check if output directory exists, if not create it
  const outputDirectory = await createOrReturnDirectory('./public/thumbnails/')
  // get inputes from the query
  const { file_name, width, height } = req.query as {
    file_name: string
    width: string
    height: string
  }

  //   check if the image resized with same dimensions exists
  const imageExtentionClean = getFileExtension(file_name)
  const resizedImageExists = fs.existsSync(
    `${outputDirectory}${
      file_name.split('.')[0]
    }_${width}_X_${height}.${imageExtentionClean}`
  )

  if (resizedImageExists) {
    // get and send existing resized image
    console.log('FROM FILE SYSTEM')
    await sharp(
      `${outputDirectory}${
        file_name.split('.')[0]
      }_${width}_X_${height}.${imageExtentionClean}`
    )
      .toBuffer()
      .then((data) => {
        return res
          .send(
            '<img alt="Resized Image" src="data:image/png;base64,' +
              data.toString('base64') +
              '" />'
          )
          .status(200)
      })
  } else {
    //  CHEK if image in demo-images directory
    const fileExists = await fs.existsSync(`./public/demo-images/${file_name}`)
    if (fileExists) {
      // Validate image inputs from request using ImageDataValidator function
      const inputsStatusCheck = ImageDataValidator(file_name, width, height)
      if (inputsStatusCheck === 'SUCCESS') {
        // do the work
        await sharp(`./public/demo-images/${file_name}`)
          .resize({
            width: parseInt(width),
            height: parseInt(height),
          })
          .toBuffer()
          .then((data) => {
            fs.writeFileSync(
              `${outputDirectory}${
                file_name.split('.')[0]
              }_${width}_X_${height}.${imageExtentionClean}`,
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
      } else if (inputsStatusCheck === 'fileNameNotValide') {
        // when the image name, width and height are not valid, or image have no extention
        const errorAlert = displayErrorAlert(
          'Invalid image name',
          'Please check your image name and extension'
        )
        res.status(400).send(errorAlert)
      } else if (inputsStatusCheck === 'widthAndHeightNotValide') {
        // when the image name, width and height are not valid, or image have no extention
        const errorAlert = displayErrorAlert(
          'fill width and height',
          'Please fill width and height'
        )
        res.status(400).send(errorAlert)
      } else if (inputsStatusCheck === 'widthAndHeightNotNumbers') {
        // send error message
        const errorAlert = displayErrorAlert(
          'width and height must be numbers',
          'Please check your width and height inputs it must be numbers'
        )
        res.status(400).send(errorAlert)
      } else {
        // send common error message
        const errorAlert = displayErrorAlert(
          'Oops!',
          'Something went wrong, please try again'
        )
        res.status(400).send(errorAlert)
      }
    } else {
      const errorAlert = displayErrorAlert(
        'image not found',
        `please select an image from the demo-images directory<br><hr/>
        <strong>Available images</strong> <br>
        [ encenadaport.jpg , fjord.jpg , icelandwaterfall.jpg , palmtunnel.jpg , santamonica.jpg ]`
      )
      res.status(400).send(errorAlert)
    }
  }
})

export default resizeRouter
