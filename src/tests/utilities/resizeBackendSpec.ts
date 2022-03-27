import resizeImageBackend from '../../utilities/resizeBackend'
import express from 'express'
import supertest from 'supertest'
import app from '../../index'

const request = supertest(app)
// in this test the image resized and saved to the directory
describe('resizeImageBackend (for back-end functionality testing)', () => {
  it('Check if image found after resize (back-end)', async () => {
    const testFileName = 'santamonica.jpg'
    const testWidth = '100'
    const testHeight = '100'
    const testOutputDir = './public/thumbnails/'
    const testDemoImageDirectory = './public/demo-images/'
    const testRes = express.response
    // const testRes = request.get('/resize')

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
