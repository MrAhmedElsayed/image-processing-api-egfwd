import fs from 'fs'

export const imageToBase64 = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.toString('base64'))
      }
    })
  })
}

export const base64ToBuffer = (base64: string): Buffer => {
  return Buffer.from(base64, 'base64')
}

export const base64ToBufferOnfly = (base64: string): Buffer => {
  const toString = `${base64}`
  const parts = toString.split(';')
  const imageData = parts[1].split(',')[1]
  const img = Buffer.from(imageData, 'base64')
  return img
}
