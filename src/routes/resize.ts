import express from 'express'
import createOrReturnDirectory from '../utilities/filesManage'
import resizeImageBackend from '../utilities/resizeBackend'

const resizeRouter = express.Router()

resizeRouter.get('/', async (req: express.Request, res: express.Response) => {
  // check if output directory exists, if not create it
  const outputDirectory = await createOrReturnDirectory('./public/thumbnails/')
  const imagesDirectory = './public/demo-images/'
  // get inputes from the query
  const { file_name, width, height } = (await req.query) as {
    file_name: string
    width: string
    height: string
  }
  await resizeImageBackend(
    file_name,
    width,
    height,
    outputDirectory,
    imagesDirectory,
    res
  )
})

export default resizeRouter
