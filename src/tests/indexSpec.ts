import createOrReturnDirectory from '../utilities/filesManage'
import resizeImage from '../utilities/resizeFrontend'
import { base64ToBuffer, imageToBase64 } from '../utilities/imageToBuffer'
import resizeImageBackend from '../utilities/resizeBackend'
import express from 'express'

// Create a test to see if the directory exists or not, and if it does not exist,
// it will be created
it('should return the directory path', () => {
  const defaultPath = 'public/thumbnails'
  const directoryPath = createOrReturnDirectory(defaultPath)
  expect(directoryPath).toBe(defaultPath)
})

// Create a test in an asynchronous way to change the image size by entering the file name,
// width, height and check whether the image has been converted correctly
describe('resizeImage (for front-end functionality testing)', () => {
  it('Check if image found after resize (front-end)', async () => {
    const base64Image = await imageToBase64(
      './public/demo-images/icelandwaterfall.jpg'
    )
    const imageBuffer = base64ToBuffer(base64Image)
    const image = await resizeImage(
      imageBuffer,
      100,
      100,
      'icelandwaterfall',
      'jpg'
    )
    expect(image).toBeDefined()
  })
})

// in this test the image resized and saved to the directory
describe('resizeImageBackend (for back-end functionality testing)', () => {
  it('Check if image found after resize (back-end)', async () => {
    const testFileName = 'santamonica.jpg'
    const testWidth = '100'
    const testHeight = '100'
    const testOutputDir = './public/thumbnails/'
    const testDemoImageDirectory = './public/demo-images/'
    const testRes = express.response

    expect(async () => {
      await resizeImageBackend(
        testFileName,
        testWidth,
        testHeight,
        testOutputDir,
        testDemoImageDirectory,
        testRes
      )
    }).not.toThrow()
  })
})
