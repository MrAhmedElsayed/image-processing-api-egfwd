import sharp from 'sharp'
import createOrReturnDirectory from './filesManage'
import checkIfThumbnailExists from './parseCash'

const default_thumbnail_directory = './public/thumbnails/'

async function resizeImage(
  image: Buffer,
  width: number,
  height: number,
  fileName: string,
  imageExtension: string
) {
  const direc = createOrReturnDirectory(default_thumbnail_directory)

  const ifThumb = await checkIfThumbnailExists(
    fileName,
    width,
    height,
    imageExtension,
    direc
  )

  console.log(ifThumb)

  if (ifThumb) {
    console.log('>>>>> thumbnail already exists <<<<<')
    // if image found grab it from thumbnails directory
    const image = sharp(
      `${direc}/${fileName}_${width}_X_${height}.${imageExtension}`
    )
      .toBuffer()
      .then((data) => {
        const returnedData = { bufferImage: data.toString('base64') }
        return returnedData
      })

    return image
  } else {
    console.log('>>>>> CREATE NEW ONE <<<<<')
    try {
      await sharp(image)
        .resize({
          width: width,
          height: height,
        })
        .toFile(direc + `${fileName}_${width}_X_${height}.${imageExtension}`)
        .then((data) => {
          console.log(data)
          // send base64 string
          console.log('resize done')
        })
    } catch (error) {
      console.log(error)
    }

    // todo: Find way to combine to functions togrther
    const semiTransparentRedPng = await sharp(image)
      .resize({
        width: width,
        height: height,
      })
      .toBuffer()
      .then((data) => {
        const returnedData = { bufferImage: data.toString('base64') }
        return returnedData
      })

    return semiTransparentRedPng
  }
}

export default resizeImage
