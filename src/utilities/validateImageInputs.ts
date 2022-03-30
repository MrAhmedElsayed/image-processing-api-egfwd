// get file extension lowercase
export function getFileExtension(fileName: string): string {
  // check period found in file name
  if (fileName.indexOf('.') === -1 || fileName.indexOf('.') === 0) {
    return '' as string
  } else {
    // get the file extension
    return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()
    // return (fileName.split('.').pop() as string).toLowerCase()
  }
}

// TODO: check for if the image without the extension
export function ImageDataValidator(
  imageName: string,
  width: string,
  height: string
): string {
  // check if the image have extension
  const imageExtensionClean = getFileExtension(imageName)
  let statusCode: string
  if (imageExtensionClean.length === 0) {
    statusCode = 'fileNameNotValid'
    return statusCode
  } else if (width.length === 0 || height.length === 0) {
    // send when the image name, width and height are not valid, or image have no extension
    statusCode = 'widthAndHeightNotValid'
    return statusCode
  } else {
    // check if the width and height are numbers
    if (isNaN(parseInt(width)) || isNaN(parseInt(height))) {
      // send when the width and height are not numbers
      statusCode = 'widthAndHeightNotNumbers'
      return statusCode
    }
    if (parseInt(width) <= 0 || parseInt(height) <= 0) {
      // send when the width and height are greater than 0
      statusCode = 'widthAndHeightGreaterThanZero'
      return statusCode
    } else {
      // send when image file, width and height are valid
      statusCode = 'SUCCESS'
      return statusCode
    }
  }
}
