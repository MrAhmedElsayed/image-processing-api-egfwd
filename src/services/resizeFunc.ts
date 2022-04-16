import sharp from 'sharp'
import fs from 'fs'

export default async function resizeImage(
  inputFilename: string,
  width: string,
  height: string,
  outputDirectory: string,
  hostedImagesDirectory: string
): Promise<void> {
  try {
    // if not output directory exists, create it
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory)
    }

    const w = parseInt(width)
    const h = parseInt(height)

    const image = sharp(`${hostedImagesDirectory}/${inputFilename}`)
    const resize = image.resize(w, h)
    // remove the file extension
    const fileName = inputFilename.split('.')[0]
    const fileExtension = inputFilename.split('.')[1]
    const outputFilename = `${outputDirectory}/${fileName}-${width}x${height}.${fileExtension}`
    await resize.toFile(outputFilename)
  } catch (e) {
    throw new Error(`${e}`)
  }
}
