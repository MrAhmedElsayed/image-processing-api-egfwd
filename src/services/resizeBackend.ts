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
    // TODO: read and return hosted static image from thumbnails directory
    //get image from thumbnails directory and send it to client
    const image = fs.readFileSync(
      `${outputDir}${
        inFileName.split('.')[0]
      }_${inWidth}_X_${inHeight}.${imageExtensionClean}`
    )
    inRes.writeHead(200, {
      'Content-Type': 'image/' + imageExtensionClean,
      'Content-Length': image.length,
    })
    inRes.end(image)
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
          .toFile(
            `${outputDir}${
              inFileName.split('.')[0]
            }_${inWidth}_X_${inHeight}.${imageExtensionClean}`
          )
          .then(() => {
            const image = fs.readFileSync(
              `${outputDir}${
                inFileName.split('.')[0]
              }_${inWidth}_X_${inHeight}.${imageExtensionClean}`
            )
            inRes.writeHead(200, {
              'Content-Type': 'image/' + imageExtensionClean,
              'Content-Length': image.length,
            })
            inRes.end(image)
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
      } else if (inputsStatusCheck === 'widthAndHeightNotNumbers') {
        const errorAlert = displayErrorAlert(
          'width and height must be numbers',
          'Please check your width and height inputs it must be numbers'
        )
        inRes.status(400).send(errorAlert)
      } else if (inputsStatusCheck === 'widthAndHeightGreaterThanZero') {
        const errorAlert = displayErrorAlert(
          'width and height must be greater than zero',
          'Please check your width and height inputs it must be greater than zero'
        )
        inRes.status(400).send(errorAlert)
      } else {
        const errorAlert = displayErrorAlert(
          'Oops!',
          'Something went wrong, please try again'
        )
        inRes.status(400).send(errorAlert)
      }
    } else {
      const errorAlert = displayErrorAlert(
        'image not found',
        `please select an image from the <strong>demo-images</strong> directory<br><hr/>
        <strong style='display:block;margin-bottom:1px;'>Available images</strong> <br>
        [ encenadaport.jpg , fjord.jpg , icelandwaterfall.jpg , palmtunnel.jpg , santamonica.jpg ]`
      )
      inRes.status(400).send(errorAlert)
    }
  }
}

export default resizeImageBackend
