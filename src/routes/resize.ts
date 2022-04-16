import express from 'express'
import resizeImage from '../services/resizeFunc'
import * as fs from 'fs'
import { displayErrorAlert } from '../utils/errorStyle'

const resizeRouter = express.Router()

export default resizeRouter.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const { file_name, width, height } = req.query as {
      file_name: string
      width: string
      height: string
    }
    const outputDirectory = './public/resized/'
    const hostedImagesDirectory = './public/images/'

    // Search for the file you want to resize, and if it exists, return it, or resize it and return it
    const fileName = file_name.split('.')[0]
    const fileExtension = file_name.split('.')[1]
    const checkResizedExist = fs.existsSync(
      `${outputDirectory}${fileName}-${width}x${height}.${fileExtension}`
    )
    if (checkResizedExist) {
      const responseImage = fs.readFileSync(
        `${outputDirectory}${fileName}-${width}x${height}.${fileExtension}`
      )
      res.writeHead(200, { 'Content-Type': 'image/jpeg' })
      res.end(responseImage, 'binary')
    } else {
      try {
        await resizeImage(
          file_name,
          width,
          height,
          outputDirectory,
          hostedImagesDirectory
        )
        const responseImage = fs.readFileSync(
          `${outputDirectory}${fileName}-${width}x${height}.${fileExtension}`
        )
        res.writeHead(200, { 'Content-Type': 'image/jpeg' })
        res.end(responseImage, 'binary')
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).send(displayErrorAlert(error.message))
        } else {
          res.status(500).send(error)
        }
      }
    }
  }
)
