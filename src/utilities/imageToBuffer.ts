import fs from 'fs'

// convert base64 image to buffer
function base64ToBuffer(base64: string) {
  const parts = base64.split(';')
  const imageData = parts[1].split(',')[1]
  return Buffer.from(imageData, 'base64')
}

// convert image to base64
function imageToBase64(image: string) {
    return new Promise((resolve, reject) => {
        fs.readFile(image, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.toString('base64'))
            }
        })
    })
}

export default {base64ToBuffer, imageToBase64}
