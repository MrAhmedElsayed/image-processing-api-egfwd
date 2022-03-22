"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
// get all images stored in local storage
app.get('/get-images', function (req, res) {
    console.log('get-images');
    var images = localStorage.getItem('images');
    if (images === null) {
        res.send({ message: 'No images found !' });
    }
    else {
        res.send({ images: JSON.parse(images) });
    }
});
// check if image exists in local storage
app.get('/check-image/:imageName', function (req, res) {
    console.log('check-image');
    var images = localStorage.getItem('images');
    if (images === null) {
        res.send({ message: 'No images found !' });
    }
    else {
        var image = JSON.parse(images).find(function (image) { return image.file_name === req.params.imageName; });
        if (!image) {
            res.send({ message: 'Image not found !' });
        }
        else {
            res.send({ image: image });
        }
    }
});
