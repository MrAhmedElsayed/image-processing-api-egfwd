import express from 'express'

// TODO: check for if the image without the extension
function ImageDataValidator(
  imageName: string,
  width: string,
  height: string,
  response: express.Response
): boolean {
  if (imageName.length === 0 || width.length === 0 || height.length === 0) {
    response.status(400).send('Image name, width and height are required')
    return false
  } else {
    if (isNaN(parseInt(width)) || isNaN(parseInt(height))) {
      response.status(400).send('Width and height must be integers')
      return false
    } else {
      // response.status(200).send('Image name, width and height are valid')
      return true
    }
  }
}

export default ImageDataValidator
