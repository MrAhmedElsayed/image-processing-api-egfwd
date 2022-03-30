import createOrReturnDirectory from '../../utilities/filesManage'

// Create a test to see if the directory exists or not, and if it does not exist,
// it will be created
describe('createOrReturnDirectory', () => {
  it('Check if directory exists', async () => {
    const testDirectory = './public/thumbnails/'
    const testDirectoryExists = createOrReturnDirectory(testDirectory)
    await expect(testDirectoryExists).toBe(testDirectory)
  })
})
