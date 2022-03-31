import resizeImageBackend from '../../services/resizeBackend'
import express from 'express'

// in this test the image resized and saved to the directory
it('resizeImageBackend: image found after resize (back-end) with status 200 ', async () => {
  const testFileName = 'santamonica.jpg'
  const testWidth = '170'
  const testHeight = '70'
  const testOutputDir = './public/thumbnails/'
  const testDemoImageDirectory = './public/demo-images/'
  const expressResponse = express.response as express.Response

  expect(async () => {
    await resizeImageBackend(
      testFileName,
      testWidth,
      testHeight,
      testOutputDir,
      testDemoImageDirectory,
      expressResponse
    )
  }).not.toThrow()
})
