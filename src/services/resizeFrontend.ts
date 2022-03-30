import sharp from 'sharp'
import createOrReturnDirectory from '../utilities/filesManage'
import checkIfThumbnailExists from '../utilities/parseCash'

const default_thumbnail_directory = './public/thumbnails/'

async function resizeImage(
  image: Buffer,
  width: number,
  height: number,
  fileName: string,
  imageExtension: string
): Promise<string | Buffer> {
  const outputDir = createOrReturnDirectory(default_thumbnail_directory)

  const ifThumb = await checkIfThumbnailExists(
    fileName,
    width,
    height,
    imageExtension,
    outputDir
  )

  if (ifThumb) {
    // if image found grab it from thumbnails directory
    const image = sharp(
      `${outputDir}/${fileName}_${width}_X_${height}.${imageExtension}`
    )
      .toBuffer()
      .then((data) => {
        return { bufferImage: data.toString('base64') }
      })

    return (await image).bufferImage
  } else {
    try {
      await sharp(image)
        .resize({
          width: width,
          height: height,
        })
        .toFile(
          outputDir + `${fileName}_${width}_X_${height}.${imageExtension}`
        )
        .then((data) => {
          console.log(data)
        })
    } catch (error) {
      console.log(error)
    }

    // todo: Find a way to combine two functions together
    const semiTransparentRedPng = await sharp(image)
      .resize({
        width: width,
        height: height,
      })
      .toBuffer()
      .then((data) => {
        return { bufferImage: data.toString('base64') }
      })

    return semiTransparentRedPng.bufferImage
  }
}

export default resizeImage
