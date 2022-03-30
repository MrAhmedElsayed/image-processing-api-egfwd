import supertest from 'supertest'
import app from '../index'

// create a request object
const request = supertest(app)

describe('test resize endpoint', function () {
  it('image resized and saved in thumbnails directory', async function () {
    const testFileName = 'encenadaport.jpg'
    const testWidth = '500'
    const testHeight = '300'
    const response = await request.get(
      `/resize?file_name=${testFileName}&width=${testWidth}&height=${testHeight}`
    )
    expect(response.status).toEqual(200)
  })
})
