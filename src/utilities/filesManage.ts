import fs from 'fs'

function createOrReturnDirectory(defaultPath: string) {
  if (!fs.existsSync(defaultPath)) {
    fs.mkdirSync(defaultPath)
    return defaultPath
  } else {
    return defaultPath
  }
}

export default createOrReturnDirectory
