"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64ToBufferOnfly = exports.base64ToBuffer = exports.imageToBase64 = void 0;
var fs_1 = __importDefault(require("fs"));
var imageToBase64 = function (filePath) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(filePath, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data.toString('base64'));
            }
        });
    });
};
exports.imageToBase64 = imageToBase64;
var base64ToBuffer = function (base64) {
    return Buffer.from(base64, 'base64');
};
exports.base64ToBuffer = base64ToBuffer;
var base64ToBufferOnfly = function (base64) {
    var toString = "".concat(base64);
    var parts = toString.split(';');
    var imageData = parts[1].split(',')[1];
    var img = Buffer.from(imageData, 'base64');
    return img;
};
exports.base64ToBufferOnfly = base64ToBufferOnfly;
