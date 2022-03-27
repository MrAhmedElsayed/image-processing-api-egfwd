import createOrReturnDirectory from '../../utilities/filesManage'

// Create a test to see if the directory exists or not, and if it does not exist,
// it will be created
it('should return the directory path', () => {
  const defaultPath = 'public/thumbnails'
  const directoryPath = createOrReturnDirectory(defaultPath)
  expect(directoryPath).toBe(defaultPath)
})
