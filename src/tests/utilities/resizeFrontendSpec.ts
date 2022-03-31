import resizeImage from '../../services/resizeFrontend'
import { base64ToBuffer, imageToBase64 } from '../../utilities/imageToBuffer'

// Create a test in an asynchronous way to change the image size by entering the file name,
// width, height and check whether the image has been converted correctly
describe('resizeImage: (for front-end functionality testing)', () => {
  it('Check if sent as buffer as response (front-end)', async () => {
    const base64Image = await imageToBase64(
      './public/demo-images/icelandwaterfall.jpg'
    )
    expect(async () => {
      const imageBuffer = base64ToBuffer(base64Image)
      await resizeImage(imageBuffer, 100, 100, 'icelandwaterfall', 'jpg')
    }).not.toThrow()
  })
})
