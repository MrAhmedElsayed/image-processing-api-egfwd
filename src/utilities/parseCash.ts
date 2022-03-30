import fs from 'fs'
import sharp from 'sharp'

// get width height name and format from user
// create function that takes image information
// and return image or false

async function checkIfThumbnailExists(
  imageName: string,
  imageWidth: number,
  imageHeight: number,
  imageExtension: string,
  thumbnailsPath: string
): Promise<boolean> {
  // get all thumbnails in thumbnails directory
  const thumbnails = fs.readdirSync(thumbnailsPath)
  const thumbnailName = `${imageName}_${imageWidth}_X_${imageHeight}.${imageExtension}`
  if (thumbnails.includes(thumbnailName)) {
    // check for other image info
    const imageMetadata = sharp(`${thumbnailsPath}${thumbnailName}`).metadata()
    const width = (await imageMetadata).width
    const height = (await imageMetadata).height
    // check if image info is the same
    if (imageWidth === width && imageHeight === height) {
      return true
    }
  } else {
    return false
  }
  return false
}

export default checkIfThumbnailExists
