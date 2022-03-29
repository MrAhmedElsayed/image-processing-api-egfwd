import resizeImageBackend from '../../utilities/resizeBackend'
import express from 'express'

// in this test the image resized and saved to the directory
describe('resizeImageBackend (for back-end functionality testing)', () => {
  it('Check if image found after resize (back-end)', async () => {
    const testFileName = 'santamonica.jpg'
    const testWidth = '100'
    const testHeight = '100'
    const testOutputDir = './public/thumbnails/'
    const testDemoImageDirectory = './public/demo-images/'
    const testRes = express.response

    await expect(async () => {
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
