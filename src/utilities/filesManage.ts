import fs from 'fs'

function createOrReturnDirectory(defaultPath: string) {
  if (!fs.existsSync(defaultPath)) {
    fs.mkdirSync(defaultPath)
    console.log('directory created')
    return defaultPath
  } else {
    console.log('directory already exists')
    return defaultPath
  }
}

export default createOrReturnDirectory
