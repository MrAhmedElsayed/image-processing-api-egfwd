import fs from 'fs'

const default_path = './public/thumbnails/'

// check with fs promise if directory exists
export const checkDirectory = (path: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          resolve(false)
        } else {
          reject(err)
        }
      } else {
        resolve(stats.isDirectory())
      }
    })
  })
}

// check with fs promise if file exists
export const checkFile = (path: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          resolve(false)
        } else {
          reject(err)
        }
      } else {
        resolve(stats.isFile())
      }
    })
  })
}

// list all images in a directory
export const listImages = (path: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}

//  check with fs promise if file exists or return default path
export const checkFileOrDefault = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      console.log(stats)
      if (err) {
        if (err.code === 'ENOENT') {
          resolve(default_path)
        } else {
          reject(err)
        }
      } else {
        resolve(path)
      }
    })
  })
}
