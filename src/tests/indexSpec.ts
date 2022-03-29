import supertest from 'supertest'
import app from '../index'
import createOrReturnDirectory from '../utilities/filesManage'

// create a request object
const request = supertest(app)

describe('test rezise endpoint', function () {
  it('image resized and saved in thumbnails directory', async function () {
    const default_thumbnail_directory = './public/thumbnails/'
    await createOrReturnDirectory(default_thumbnail_directory)
    const testFileName = 'encenadaport.jpg'
    const testWidth = '500'
    const testHeight = '300'
    const response = await request
      .get(
        `/resize?file_name=${testFileName}&width=${testWidth}&height=${testHeight}`
      )
      .set('Accept', 'application/json')
    await expect(response.status).toEqual(200)
  })
})
