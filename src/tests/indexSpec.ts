import createOrReturnDirectory from '../utilities/filesManage'
import resizeImage from '../utilities/resizeFrontend'
import { base64ToBuffer, imageToBase64 } from '../utilities/imageToBuffer'

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
      './public/demo-images/santamonica.jpg'
    )
    const imageBuffer = base64ToBuffer(base64Image)
    const image = await resizeImage(imageBuffer, 100, 100, 'santamonica', 'jpg')
    expect(image).toBeDefined()
  })
})
