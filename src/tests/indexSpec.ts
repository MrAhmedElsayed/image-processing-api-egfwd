import createOrReturnDirectory from '../utilities/filesManage'
import resizeImage from '../utilities/resize'

// Create a test to see if the directory exists or not, and if it does not exist, it will be created
describe('createOrReturnDirectory', () => {
  it('should return the directory path', () => {
    const defaultPath = 'public/thumbnails'
    const directoryPath = createOrReturnDirectory(defaultPath)
    expect(directoryPath).toBe(defaultPath)
  })
})

// Create a test in an asynchronous way to change the image size by entering the file name,
// width, height and check whether the image has been converted correctly
describe('resizeImage', () => {
  it('should return the image path', async () => {
    const defaultPath = 'public/thumbnails'
    const imageName = 'test'
    const imageWidth = 100
    const imageHeight = 100
    const imageExtension = 'jpg'
    const imagePath = `${defaultPath}/${imageName}_${imageWidth}_X_${imageHeight}.${imageExtension}`
    const image = await resizeImage(
      imageName,
      imageWidth,
      imageHeight,
      imageExtension,
      defaultPath
    )
    expect(image).toBe(imagePath)
  })
})
