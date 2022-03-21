// just wait for document completely loaded and parsed
document.addEventListener("DOMContentLoaded", function () {
    // initialize deom video modal  
    intializeDemoVideo('demoVideo', "videoFrame", 'https://www.youtube.com/embed/oRGDhgITetc');
    // upload image proccess 
    listenToInputChanges('image-input')

    // listen to upload Button
    // document.getElementById('upload-image-btn').addEventListener('click', Upload);
    document.getElementById('upload-image-btn').addEventListener('click',
        displayImageAndInfoAlert.bind(event, 'image-input', 'image-info-alert', 'image-name', 'image-size', 'image-type', 'image-dimensions', 'fieldset', 'preview-box'), false
    );

    function Upload() {
        //Get reference of FileUpload.
        var fileUpload = document.getElementById("image-input");
        let image_box = document.getElementById('preview-box');

        console.log(getImageExtension(fileUpload.files[0].name));

        //Check whether the file is valid Image.
        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.gif)$");
        if (regex.test(fileUpload.value.toLowerCase())) {

            //Check whether HTML5 is supported.
            if (typeof (fileUpload.files) != "undefined") {
                //Initiate the FileReader object.
                var reader = new FileReader();
                //Read the contents of Image File.
                reader.readAsDataURL(fileUpload.files[0]);
                reader.onload = function (e) {
                    //Initiate the JavaScript Image object.
                    var image = new Image();
                    //Set the Base64 string return from FileReader as source.
                    image.src = e.target.result;
                    image_box.setAttribute("src", e.target.result);
                    //Validate the File Height and Width.
                    image.onload = function () {
                        let height = this.height;
                        let width = this.width;
                        // file size
                        let nBytes = fileUpload.files[0].size;
                        let sOutput = nBytes + 'bytes';
                        const aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
                        for (nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
                            sOutput = `${nApprox.toFixed(2)} ${aMultiples[nMultiple]}`;
                        }
                        document.getElementById("image-info-alert").style.display = "block";
                        document.getElementById('image-name').innerHTML = fileUpload.files[0].name;
                        document.getElementById('image-size').innerHTML = sOutput;
                        document.getElementById('image-type').innerHTML = fileUpload.files[0].type;
                        document.getElementById('image-dimensions').innerHTML = `${width} x ${height}`;
                        document.getElementById('fieldset').disabled = false;
                        return true;
                    };
                }
            } else {
                restAllAfterError("This browser does not support HTML5.", 'http://127.0.0.1:3000/images/undraw_responsiveness.svg');
                return false;
            }
        } else {
            restAllAfterError("Please select a valid Image file...", 'http://127.0.0.1:3000/images/undraw_responsiveness.svg');
            return false;
        }
    }

    // ------------------------------------- Inputes Validator ----------------------------------------

    function ImageDataValidator(imageFile, width, height) {

    }


    // -------------------------------------[1] UI behaviors ----------------------------------------

    // [1-1] get file extension lowercase
    function getImageExtension(filename) {
        return filename.split('.').pop().toLowerCase();
    }

    // [1-2] display Image info on upload
    function displayImageAndInfoAlert(imageFileID, infoAlertID, NameId, sizeID, typeID, dimensionsID, fieldsetOrFormID, previewBoxID) {
        // select image file
        let imageFileInput = document.getElementById(`${imageFileID}`);
        let imageExtention = getImageExtension(imageFileInput.files[0].name);
        // check if image is valid Extention
        if (imageExtention === 'png' || imageExtention === 'jpg' || imageExtention === 'jpeg') {
            // if HTML5 is supported.
            if (typeof (imageFileInput.files) != "undefined") {
                //Initiate the FileReader object.
                var reader = new FileReader();
                //Read the contents of Image File.
                reader.readAsDataURL(imageFileInput.files[0]);
                reader.onload = function (e) {
                    var image = new Image();
                    //Set the Base64 string return from FileReader as source.
                    image.src = e.target.result;
                    let preview_box = document.getElementById(`${previewBoxID}`);
                    preview_box.setAttribute("src", e.target.result);
                    image.onload = function () {
                        // initial width and height (run in reader.onload function)
                        let height = this.height;
                        let width = this.width;
                        // display image size extention or unit
                        let byteSize = imageFileInput.files[0].size;
                        let outputSize = byteSize + 'bytes';
                        // list of extention
                        const sizeExtentions = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
                        // loop through extention list
                        for (let i = 0, unitIndex = byteSize / 1024; unitIndex > 1;  unitIndex /= 1024, i++) {
                            outputSize = unitIndex.toFixed(2) + ' ' + sizeExtentions[i];
                        }
                        // display image info
                        document.getElementById(`${infoAlertID}`).style.display = "block";
                        document.getElementById(`${NameId}`).innerHTML = imageFileInput.files[0].name;
                        document.getElementById(`${sizeID}`).innerHTML = outputSize;
                        document.getElementById(`${typeID}`).innerHTML = imageFileInput.files[0].type;
                        document.getElementById(`${dimensionsID}`).innerHTML = `${width} x ${height}`;
                        document.getElementById(`${fieldsetOrFormID}`).disabled = false;
                    }
                }
            } else {
                // if HTML5 is not supported.
                restAllAfterError("This browser does not support HTML5.", 'http://127.0.0.1:3000/images/undraw_responsiveness.svg');
            }
        } else {
            // if not valid image extention, display error message
            restAllAfterError("Please select a valid Image file...", 'http://127.0.0.1:3000/images/undraw_responsiveness.svg');
        }
    }

    // [1-3] initial demo video modal
    function intializeDemoVideo(modalVideoID, videoFrame, videoSrc) {
        let videoModal = document.getElementById(`${modalVideoID}`);
        videoModal.addEventListener('shown.bs.modal', function () {
            const fullPath = `${videoSrc}`;
            document.getElementById(`${videoFrame}`).setAttribute("src", fullPath);
        })
    }

    // [1-4] set ui after image upload
    function listenToInputChanges(inputID) {
        let uploadFile = document.getElementById(`${inputID}`);
        uploadFile.addEventListener('change', function () {
            document.getElementById('upload-image-btn').disabled = false;
            document.getElementById("image-info-alert").style.display = "none";
            document.getElementById("error-alert").style.display = "none";
            document.getElementById('fieldset').disabled = true;
        })
    }

    // [1-5] reset all after upload error image extension
    function restAllAfterError(errorMessage, defaultImageLink) {
        let image_box = document.getElementById('preview-box');
        document.getElementById("error-alert").style.display = "block";
        image_box.setAttribute("src", `${defaultImageLink}`);
        document.getElementById('fieldset').disabled = true;
        document.getElementById("error-message").innerHTML = `${errorMessage}`;
    }

    // ------------------------------------- list all images resized from localstorage ----------------------------------------
    // first check if image objects array in localstorage
    var imageObjects = JSON.parse(localStorage.getItem('imageObjects'));
    if (imageObjects) {
        // if image objects array in localstorage, then list all images
        var imageList = document.getElementById('imageList');

        for (var i = 0; i < imageObjects.length; i++) {
            var image = imageObjects[i];
            var imageItem = document.createElement('li');
            imageItem.setAttribute('class', 'list-group-item');
            imageItem.setAttribute('id', image.id);
            imageItem.innerHTML = '<img src="' + image.src + '" class="img-thumbnail" alt="' + image.alt + '" />';
            imageList.appendChild(imageItem);
        }
    } else {
        // if no image objects array in localstorage, then create one
        imageObjects = [];
        localStorage.setItem('imageObjects', JSON.stringify(imageObjects));
    }

    // ------------------------------------- api requests ----------------------------------------
    document.getElementById('resize-btn').addEventListener('click', function () {
        var fileUpload = document.getElementById("image-input").files[0];
        let width = document.getElementById('width').value;
        let height = document.getElementById('height').value;
        // check if all fields are filled with valid values
        if (width == "" || height == "" && fileUpload == null) {
            console.log("empty");
            document.getElementById("form-error-alert").style.display = "block";
            document.getElementById("form-error-message").innerHTML = "Please fill all fields with valid values";
        } else {
            document.getElementById("form-error-alert").style.display = "none";
            // send request to server

            const image_data = {
                imageObject: fileUpload,
                width: width,
                height: height
            }

            const formData = new FormData();
            formData.append('imageObject', fileUpload);

            axios({
                method: 'post',
                url: `http://127.0.0.1:3000/resize`,
                data: {
                    imageObject: fileUpload,
                    formData: formData,
                    file_name: fileUpload.name,
                    width: width,
                    height: height
                }
            })
                .then(res => {
                    console.log(res.data);
                    // console.log(res.data.bufferImage);

                    let data = res.data.bufferImage;
                    document.getElementById('preview-box').setAttribute("src", `data:image/jpeg;base64,${data}`);
                })
                .catch(err => console.warn(err));

            console.log(typeof (fileUpload));
            console.log(typeof (width));
            console.log(typeof (height));
        }
    })



    // ************** end completely loaded
});


