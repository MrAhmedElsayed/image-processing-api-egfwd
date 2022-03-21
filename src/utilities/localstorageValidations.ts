// get all images stored in local storage
app.get("/get-images", (req, res) => {
    console.log("get-images");
    const images = localStorage.getItem("images");
    if (images === null) {
        res.send({ message: "No images found !" });
    } else {
        res.send({ images: JSON.parse(images) });
    }
});

// check if image exists in local storage
app.get("/check-image/:imageName", (req, res) => {
    console.log("check-image");
    const images = localStorage.getItem("images");
    if (images === null) {
        res.send({ message: "No images found !" });
    } else {
        const image = JSON.parse(images).find(
            (image) => image.file_name === req.params.imageName
        );
        if (!image) {
            res.send({ message: "Image not found !" });
        } else {
            res.send({ image });
        }
    }
});
