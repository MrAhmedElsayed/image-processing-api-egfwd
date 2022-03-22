"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resize_1 = __importDefault(require("../utilities/resize"));
var resizeRoute = express_1.default.Router();
// get base64 string from image and resize with sharp
resizeRoute.post('/', function (req, res) {
    // console.log(req.body);
    var base64Image = "".concat(req.body.imageFile);
    var parts = base64Image.split(';');
    // const mimType = parts[0].split(':')[1]
    var imageData = parts[1].split(',')[1];
    var img = Buffer.from(imageData, 'base64');
    // resize image
    (0, resize_1.default)(img, req.body.width, req.body.height, req.body.imageFileName, req.body.imageExtension).then(function (data) {
        res.send(data);
    });
});
exports.default = resizeRoute;
