import resizeImage from '../services/resizeFunc'

describe('resizeImage', () => {
  it('should resize "icelandwaterfall.jpg" image and save it', async () => {
    const testWidth = '100'
    const testHeight = '100'
    const outputDirectory = './public/resized/'
    const hostedImagesDirectory = './public/images/'
    const fileName = 'icelandwaterfall.jpg'

    expect(async () => {
      await resizeImage(
        fileName,
        testWidth,
        testHeight,
        outputDirectory,
        hostedImagesDirectory
      )
    }).not.toThrow()
  })
})
