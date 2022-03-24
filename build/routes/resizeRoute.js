"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resize_1 = __importDefault(require("../utilities/resize"));
var imageToBuffer_1 = require("../utilities/imageToBuffer");
var resizeRoute = express_1.default.Router();
// get base64 string from image and resize with sharp
resizeRoute.post('/', function (req, res) {
    var img = (0, imageToBuffer_1.base64ToBufferOnfly)(req.body.imageFile);
    // resize image
    (0, resize_1.default)(img, req.body.width, req.body.height, req.body.imageFileName, req.body.imageExtension)
        .then(function (data) {
        res.send(data).status(200);
    })
        .catch(function (err) {
        res.send(err).status(500);
    });
});
exports.default = resizeRoute;
