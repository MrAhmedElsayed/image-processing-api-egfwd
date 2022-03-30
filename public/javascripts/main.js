// just wait for document completely loaded and parsed
document.addEventListener('DOMContentLoaded', function () {
  // initialize deom video modal
  intializeDemoVideo(
    'demoVideo',
    'videoFrame',
    'https://www.youtube.com/embed/17V8azMo4j0'
  )

  // upload image proccess
  listenToInputChanges('image-input')

  // listen to upload Button
  document
    .getElementById('upload-image-btn')
    .addEventListener(
      'click',
      displayImageAndInfoAlert.bind(
        event,
        'image-input',
        'image-info-alert',
        'image-name',
        'image-size',
        'image-type',
        'image-dimensions',
        'fieldset',
        'preview-box'
      ),
      false
    )

  // -------------------------------------[1] UI behaviors ----------------------------------------

  // [1-1] display Image info on upload
  function displayImageAndInfoAlert(
    imageFileID,
    infoAlertID,
    NameId,
    sizeID,
    typeID,
    dimensionsID,
    fieldsetOrFormID,
    previewBoxID
  ) {
    // select image file
    let imageFileInput = document.getElementById(`${imageFileID}`)
    let imageExtention = getImageExtension(imageFileInput.files[0].name)
    // check if image is valid Extention
    if (
      imageExtention === 'png' ||
      imageExtention === 'jpg' ||
      imageExtention === 'jpeg'
    ) {
      // if HTML5 is supported.
      if (typeof imageFileInput.files != 'undefined') {
        //Initiate the FileReader object.
        var reader = new FileReader()
        //Read the contents of Image File.
        reader.readAsDataURL(imageFileInput.files[0])
        reader.onload = function (e) {
          var image = new Image()
          //Set the Base64 string return from FileReader as source.
          image.src = e.target.result
          let preview_box = document.getElementById(`${previewBoxID}`)
          preview_box.setAttribute('src', e.target.result)
          image.onload = function () {
            // initial width and height (run in reader.onload function)
            let height = this.height
            let width = this.width
            // display image size extention or unit
            let byteSize = imageFileInput.files[0].size
            let outputSize = byteSize + 'bytes'
            // list of extention
            const sizeExtentions = [
              'KiB',
              'MiB',
              'GiB',
              'TiB',
              'PiB',
              'EiB',
              'ZiB',
              'YiB',
            ]
            // loop through extention list
            for (
              let i = 0, unitIndex = byteSize / 1024;
              unitIndex > 1;
              unitIndex /= 1024, i++
            ) {
              outputSize = unitIndex.toFixed(2) + ' ' + sizeExtentions[i]
            }
            // display image info
            document.getElementById(`${infoAlertID}`).style.display = 'block'
            document.getElementById(`${NameId}`).innerHTML =
              imageFileInput.files[0].name
            document.getElementById(`${sizeID}`).innerHTML = outputSize
            document.getElementById(`${typeID}`).innerHTML =
              imageFileInput.files[0].type
            document.getElementById(
              `${dimensionsID}`
            ).innerHTML = `${width} x ${height}`
            document.getElementById(`${fieldsetOrFormID}`).disabled = false
          }
        }
      } else {
        // if HTML5 is not supported.
        restAllAfterError(
          'This browser does not support HTML5.',
          'http://127.0.0.1:3000/images/undraw_responsiveness.svg'
        )
      }
    } else {
      // if not valid image extention, display error message
      restAllAfterError(
        'Please select a valid Image file...',
        'http://127.0.0.1:3000/images/undraw_responsiveness.svg'
      )
    }
  }

  // [1-2] initial demo video modal
  function intializeDemoVideo(modalVideoID, videoFrame, videoSrc) {
    let videoModal = document.getElementById(`${modalVideoID}`)
    videoModal.addEventListener('shown.bs.modal', function () {
      const fullPath = `${videoSrc}`
      document.getElementById(`${videoFrame}`).setAttribute('src', fullPath)
    })
  }

  // [1-3] set ui after image upload
  function listenToInputChanges(inputID) {
    let uploadFile = document.getElementById(`${inputID}`)
    uploadFile.addEventListener('change', function () {
      document.getElementById('upload-image-btn').disabled = false
      document.getElementById('image-info-alert').style.display = 'none'
      document.getElementById('error-alert').style.display = 'none'
      document.getElementById('fieldset').disabled = true
    })
  }

  // [1-4] reset all after upload error image extension
  function restAllAfterError(errorMessage, defaultImageLink) {
    let image_box = document.getElementById('preview-box')
    document.getElementById('error-alert').style.display = 'block'
    image_box.setAttribute('src', `${defaultImageLink}`)
    document.getElementById('fieldset').disabled = true
    document.getElementById('error-message').innerHTML = `${errorMessage}`
  }

  // ------------------------------------- [2] Utils ----------------------------------------

  // [2-1] get file extension lowercase
  function getImageExtension(filename) {
    return filename.split('.').pop().toLowerCase()
  }

  // [2-2] check if inputs before submit data
  function ImageDataValidator(
    imageInputID,
    widthInputID,
    heightInputID,
    errorAlertID,
    errorSpan,
    errorMessage
  ) {
    // get inputs values on submit
    let imageInput = document.getElementById(`${imageInputID}`).value
    let widthInput = document.getElementById(`${widthInputID}`).value
    let heightInput = document.getElementById(`${heightInputID}`).value
    //  get error alert and message
    errorMessage = 'default error message'
    errorSpan = document.getElementById(`${errorSpan}`)
    let errorAlert = document.getElementById(`${errorAlertID}`)
    // first check if image, width and height are not empty.
    if (imageInput === '' || widthInput === '' || heightInput === '') {
      errorMessage = 'Please enter a valid image, width and height'
      errorSpan.innerHTML = errorMessage
      errorAlert.style.display = 'block'
      return false
    } else {
      // check if width and height are integers
      if (isNaN(widthInput) || isNaN(heightInput)) {
        errorMessage = 'width and height must be integers'
        errorSpan.innerHTML = errorMessage
        errorAlert.style.display = 'block'
        return false
      }
      // then check if width and height are greater than 0
      else if (parseInt(widthInput) <= 0 || parseInt(heightInput) <= 0) {
        errorMessage = 'width and height must be greater than 0'
        errorSpan.innerHTML = errorMessage
        errorAlert.style.display = 'block'
        return false
      } else {
          errorAlert.style.display = 'none'
        return true
      }
    }
  }

  // [2-3] clean height and width inputs
  function cleanHeightAndWidthInputs(widthInputID, heightInputID) {
    try {
      let w = parseInt(document.getElementById(`${widthInputID}`).value)
      let h = parseInt(document.getElementById(`${heightInputID}`).value)
      return {width: w, height: h}
    } catch (error) {
      console.log(error)
    }
  }

  // ------------------------------------- [3] API Send Request ----------------------------------------

  // [3-1] image info request
  function sendImagewithDimensions() {
    let imageBase64 = ''
    let widthVar = 0
    let heightVar = 0
    

    // check if inputs before submit data
    let inputsValidator = ImageDataValidator(
      'image-input',
      'width',
      'height',
      'form-error-alert',
      'form-error-message',
      'Please fill all inputs...'
    )

    // if inputs are valid
    if (inputsValidator) {
      let imageDimentions = cleanHeightAndWidthInputs('width', 'height')
      widthVar = imageDimentions.width
      heightVar = imageDimentions.height
      let imageInput = document.getElementById('image-input')
      var reader = new FileReader()
      reader.readAsDataURL(imageInput.files[0])
      reader.onload = function (e) {
        var image = new Image()
        image.src = e.target.result
        imageBase64 = e.target.result
        // remove extension from image name
        let imageName = imageInput.files[0].name
          .split('.')
          .slice(0, -1)
          .join('.')
        // get image extension
        let imageExtension = getImageExtension(imageInput.files[0].name)
        //  show loader gif
        document
          .getElementById('preview-box')
          .setAttribute('src', 'http://127.0.0.1:3000/images/preloader.gif')

        // send data to server (using Async Axios) and return resized image
        const postImageData = async () => {
          try {
            let requestUrl = 'http://127.0.0.1:3000/resize-from-frontend'
            // eslint-disable-next-line no-undef
            const res = await axios({
              method: 'post',
              url: requestUrl,
              data: {
                imageExtension: imageExtension,
                imageFileName: imageName,
                imageFile: imageBase64,
                width: widthVar,
                height: heightVar,
              },
            })
            let resizedImageAsString = res.data
            document
              .getElementById('preview-box')
              .setAttribute(
                'src',
                `data:image/jpeg;base64,${resizedImageAsString}`
              )
          } catch (error) {
            console.log(error)
          }
        }
        postImageData()
      }
    }
  }

  document.getElementById('resize-btn').addEventListener('click', function () {
    sendImagewithDimensions()
  })

  // ------------------------------------- list all images resized from localstorage ----------------------------------------
  // todo: disabled functionality
  // first check if image objects array in localstorage
  var imageObjects = JSON.parse(localStorage.getItem('imageObjects'))
  if (imageObjects) {
    // if image objects array in localstorage, then list all images
    var imageList = document.getElementById('imageList')

    for (var i = 0; i < imageObjects.length; i++) {
      var image = imageObjects[i]
      var imageItem = document.createElement('li')
      imageItem.setAttribute('class', 'list-group-item')
      imageItem.setAttribute('id', image.id)
      imageItem.innerHTML =
        '<img src="' +
        image.src +
        '" class="img-thumbnail" alt="' +
        image.alt +
        '" />'
      imageList.appendChild(imageItem)
    }
  } else {
    // if no image objects array in localstorage, then create one
    imageObjects = []
    localStorage.setItem('imageObjects', JSON.stringify(imageObjects))
  }

  // ************** end completely loaded
})
