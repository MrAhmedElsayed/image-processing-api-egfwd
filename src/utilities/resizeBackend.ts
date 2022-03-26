import express from 'express'
import { displayErrorAlert } from '../utilities/displayErrorAlert'
import {
  ImageDataValidator,
  getFileExtension,
} from '../utilities/validateImageInputs'
import fs from 'fs'
import sharp from 'sharp'

// create async function to resize image using sharp
async function resizeImageBackend(
  outputDir: string,
  inWidth: string,
  inHeight: string,
  inFileName: string,
  inRes: express.Response
) {
  // check if the image resized with same dimensions exists
  const imageExtentionClean = await getFileExtension(inFileName)
  const resizedImageExists = await fs.existsSync(
    `${outputDir}${
      inFileName.split('.')[0]
    }_${inWidth}_X_${inHeight}.${imageExtentionClean}`
  )

  if (resizedImageExists) {
    // get and send existing resized image
    await sharp(
      `${outputDir}${
        inFileName.split('.')[0]
      }_${inWidth}_X_${inHeight}.${imageExtentionClean}`
    )
      .toBuffer()
      .then((data) => {
        return inRes
          .send(
            '<img alt="Resized Image" src="data:image/png;base64,' +
              data.toString('base64') +
              '" />'
          )
          .status(200)
      })
  } else {
    //  CHEK if image in demo-images directory
    const fileExists = await fs.existsSync(`./public/demo-images/${inFileName}`)
    if (fileExists) {
      // Validate image inputs from request using ImageDataValidator function
      const inputsStatusCheck = ImageDataValidator(
        inFileName,
        inWidth,
        inHeight
      )
      if (inputsStatusCheck === 'SUCCESS') {
        // do the work
        await sharp(`./public/demo-images/${inFileName}`)
          .resize({
            width: parseInt(inWidth),
            height: parseInt(inHeight),
          })
          .toBuffer()
          .then((data) => {
            fs.writeFileSync(
              `${outputDir}${
                inFileName.split('.')[0]
              }_${inWidth}_X_${inHeight}.${imageExtentionClean}`,
              data
            )
            return inRes
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
        inRes.status(400).send(errorAlert)
      } else if (inputsStatusCheck === 'widthAndHeightNotValide') {
        // when the image name, width and height are not valid, or image have no extention
        const errorAlert = displayErrorAlert(
          'fill width and height',
          'Please fill width and height'
        )
        inRes.status(400).send(errorAlert)
      } else if (inputsStatusCheck === 'widthAndHeightNotNumbers') {
        // send error message
        const errorAlert = displayErrorAlert(
          'width and height must be numbers',
          'Please check your width and height inputs it must be numbers'
        )
        inRes.status(400).send(errorAlert)
      } else if (inputsStatusCheck === 'widthAndHeightGreaterThanZero') {
        // send error message
        const errorAlert = displayErrorAlert(
          'width and height must be greater than zero',
          'Please check your width and height inputs it must be greater than zero'
        )
        inRes.status(400).send(errorAlert)
      } else {
        // send common error message
        const errorAlert = displayErrorAlert(
          'Oops!',
          'Something went wrong, please try again'
        )
        inRes.status(400).send(errorAlert)
      }
    } else {
      const errorAlert = displayErrorAlert(
        'image not found',
        `please select an image from the demo-images directory<br><hr/>
        <strong>Available images</strong> <br>
        [ encenadaport.jpg , fjord.jpg , icelandwaterfall.jpg , palmtunnel.jpg , santamonica.jpg ]`
      )
      inRes.status(400).send(errorAlert)
    }
  }
}

export default resizeImageBackend
