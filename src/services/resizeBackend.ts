import express from 'express'
import { displayErrorAlert } from '../utilities/displayErrorAlert'
import {
  ImageDataValidator,
  getFileExtension,
} from '../utilities/validateImageInputs'
import fs from 'fs'
import sharp from 'sharp'
import createOrReturnDirectory from '../utilities/filesManage'

// create async function to resize image using sharp
//TODO: try to return a string type
async function resizeImageBackend(
  inFileName: string,
  inWidth: string,
  inHeight: string,
  outputDir: string,
  demoImageDirectory: string,
  inRes: express.Response
): Promise<void> {
  // create a new directory if it doesn't exist
  createOrReturnDirectory(outputDir)

  //set default output directory to demo image directory
  if (outputDir === '') {
    outputDir = './public/thumbnails/'
  }

  // set default demo-image directory to demo image directory
  if (demoImageDirectory === '') {
    demoImageDirectory = './public/demo-images/'
  }

  // check if the image resized with same dimensions exists
  const imageExtensionClean = getFileExtension(inFileName)
  const resizedImageExists = fs.existsSync(
    `${outputDir}${
      inFileName.split('.')[0]
    }_${inWidth}_X_${inHeight}.${imageExtensionClean}`
  )

  if (resizedImageExists) {
    // get and send existing resized image
    await sharp(
      `${outputDir}${
        inFileName.split('.')[0]
      }_${inWidth}_X_${inHeight}.${imageExtensionClean}`
    )
      .toBuffer()
      .then((data) => {
        return inRes
          .status(200)
          .send(
            `<img alt="Resized Image" src="data:image/png;base64,${data.toString(
              'base64'
            )}" />`
          )
      })
  } else {
    //  CHECK if image in demo-images directory
    const fileExists = fs.existsSync(`${demoImageDirectory}${inFileName}`)
    if (fileExists) {
      // Validate image inputs from request using ImageDataValidator function
      const inputsStatusCheck = ImageDataValidator(
        inFileName,
        inWidth,
        inHeight
      )
      if (inputsStatusCheck === 'SUCCESS') {
        // do the work
        await sharp(`${demoImageDirectory}${inFileName}`)
          .resize({
            width: parseInt(inWidth),
            height: parseInt(inHeight),
          })
          .toBuffer()
          .then((data) => {
            fs.writeFileSync(
              `${outputDir}${
                inFileName.split('.')[0]
              }_${inWidth}_X_${inHeight}.${imageExtensionClean}`,
              data
            )
            return inRes
              .status(200)
              .send(
                `<img alt="Resized Image" src="data:image/png;base64,${data.toString(
                  'base64'
                )}" />`
              )
          })
      } else if (inputsStatusCheck === 'fileNameNotValid') {
        const errorAlert = displayErrorAlert(
          'Invalid image name',
          'Please check your image name and extension'
        )
        inRes.status(400).send(errorAlert)
        throw new Error(errorAlert)
      } else if (inputsStatusCheck === 'widthAndHeightNotValid') {
        const errorAlert = displayErrorAlert(
          'fill width and height',
          'Please fill width and height'
        )
        inRes.status(400).send(errorAlert)
        throw new Error(errorAlert)
      } else if (inputsStatusCheck === 'widthAndHeightNotNumbers') {
        const errorAlert = displayErrorAlert(
          'width and height must be numbers',
          'Please check your width and height inputs it must be numbers'
        )
        inRes.status(400).send(errorAlert)
        throw new Error(errorAlert)
      } else if (inputsStatusCheck === 'widthAndHeightGreaterThanZero') {
        const errorAlert = displayErrorAlert(
          'width and height must be greater than zero',
          'Please check your width and height inputs it must be greater than zero'
        )
        inRes.status(400).send(errorAlert)
        throw new Error(errorAlert)
      } else {
        const errorAlert = displayErrorAlert(
          'Oops!',
          'Something went wrong, please try again'
        )
        inRes.status(400).send(errorAlert)
        throw new Error(errorAlert)
      }
    } else {
      const errorAlert = displayErrorAlert(
        'image not found',
        `please select an image from the <strong>demo-images</strong> directory<br><hr/>
        <strong style="display:block;margin-bottom:1px;">Available images</strong> <br>
        [ encenadaport.jpg , fjord.jpg , icelandwaterfall.jpg , palmtunnel.jpg , santamonica.jpg ]`
      )
      inRes.status(400).send(errorAlert)
      throw new Error(errorAlert)
    }
  }
}

export default resizeImageBackend
