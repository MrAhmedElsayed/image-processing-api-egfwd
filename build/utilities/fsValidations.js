"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFileOrDefault = exports.listImages = exports.checkFile = exports.checkDirectory = void 0;
var fs_1 = __importDefault(require("fs"));
var default_path = './public/thumbnails/';
// check with fs promise if directory exists
var checkDirectory = function (path) {
    return new Promise(function (resolve, reject) {
        fs_1.default.stat(path, function (err, stats) {
            if (err) {
                if (err.code === 'ENOENT') {
                    resolve(false);
                }
                else {
                    reject(err);
                }
            }
            else {
                resolve(stats.isDirectory());
            }
        });
    });
};
exports.checkDirectory = checkDirectory;
// check with fs promise if file exists
var checkFile = function (path) {
    return new Promise(function (resolve, reject) {
        fs_1.default.stat(path, function (err, stats) {
            if (err) {
                if (err.code === 'ENOENT') {
                    resolve(false);
                }
                else {
                    reject(err);
                }
            }
            else {
                resolve(stats.isFile());
            }
        });
    });
};
exports.checkFile = checkFile;
// list all images in a directory
var listImages = function (path) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readdir(path, function (err, files) {
            if (err) {
                reject(err);
            }
            else {
                resolve(files);
            }
        });
    });
};
exports.listImages = listImages;
//  check with fs promise if file exists or return default path
var checkFileOrDefault = function (path) {
    return new Promise(function (resolve, reject) {
        fs_1.default.stat(path, function (err, stats) {
            console.log(stats);
            if (err) {
                if (err.code === 'ENOENT') {
                    resolve(default_path);
                }
                else {
                    reject(err);
                }
            }
            else {
                resolve(path);
            }
        });
    });
};
exports.checkFileOrDefault = checkFileOrDefault;
