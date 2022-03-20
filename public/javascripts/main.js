// just wait for document completely loaded and parsed
document.addEventListener("DOMContentLoaded", function () {
    // ************** start completely loaded
    // ------------------------------------- initial demo video ----------------------------------------
    var videoModal = document.getElementById('demoVideo');
    videoModal.addEventListener('shown.bs.modal', function () {
        const fullPath = 'https://www.youtube.com/embed/oRGDhgITetc';
        document.getElementById("videoFrame").setAttribute("src", fullPath);
    })
    // ------------------------------------- upload image proccess ----------------------------------------
    var uploadFile = document.getElementById('image-input');
    uploadFile.addEventListener('change', function () {
        document.getElementById('upload-image-btn').disabled = false;
        document.getElementById("image-info-alert").style.display = "none";
        document.getElementById("error-alert").style.display = "none";
        document.getElementById('fieldset').disabled = true;
    })
    document.getElementById('upload-image-btn').addEventListener('click', Upload);

    function Upload() {
        //Get reference of FileUpload.
        var fileUpload = document.getElementById("image-input");
        var image_box = document.getElementById('preview-box');

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
                document.getElementById("error-alert").style.display = "block";
                document.getElementById("error-message").innerHTML = "This browser does not support HTML5.";
                image_box.setAttribute("src", 'http://127.0.0.1:3000/images/undraw_responsiveness.svg');
                document.getElementById('fieldset').disabled = true;
                return false;
            }
        } else {
            document.getElementById("error-alert").style.display = "block";
            document.getElementById("error-message").innerHTML = "Please select a valid Image file..";
            image_box.setAttribute("src", 'http://127.0.0.1:3000/images/undraw_responsiveness.svg');
            document.getElementById('fieldset').disabled = true;
            return false;
        }
    }

    // ------------------------------------- api requests ----------------------------------------
    document.getElementById('resize-btn').addEventListener('click', function () {
        var fileUpload = document.getElementById("image-input").files[0];
        let width = document.getElementById('width').value;
        let height = document.getElementById('height').value;
        let resize_url = `imageObject= ${fileUpload} width=${width}&height=${height}`;
        // check if all fields are filled with valid values
        if (width == "" || height == "" && fileUpload == null) {
            console.log("empty");
            document.getElementById("form-error-alert").style.display = "block";
            document.getElementById("form-error-message").innerHTML = "Please fill all fields with valid values";
        } else {
            document.getElementById("form-error-alert").style.display = "none";
            // send request to server
            
            axios.post(`http://127.0.0.1:3000/resize`, null, { params: {
                file_name: fileUpload.name,
                width: width,
                height: height
              }})
              .then(res => {
                console.log(res.data);
              })
              .catch(err => console.warn(err));

            console.log(typeof (fileUpload));
            console.log(typeof (width));
            console.log(typeof (height));
        }


    })


    // ************** end completely loaded
});


