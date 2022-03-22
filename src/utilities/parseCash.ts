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
  defaultPath: string
) {
  // get all thumbnails in thumbnails directory
  const thumbnails = fs.readdirSync(defaultPath)
  const thumbnailName = `${imageName}_${imageWidth}_X_${imageHeight}.${imageExtension}`
  if (thumbnails.includes(thumbnailName)) {
    // check for other image info
    const imageMetadata = sharp(
      `./public/thumbnails/${thumbnailName}`
    ).metadata()

    const width = (await imageMetadata).width
    const height = (await imageMetadata).height
    // check if image info is the same
    if (
      imageWidth === width &&
      imageHeight === height
    ) {

      console.log('checkIfThumbnailExists >>>> Found ;)')
      return true
    }
  } else {
    console.log('checkIfThumbnailExists >>>> Not Found ;(')
    return false
  }
}

export default checkIfThumbnailExists
