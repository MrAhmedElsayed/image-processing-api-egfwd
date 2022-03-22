"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var homeRoute = express_1.default.Router();
/* GET home page. */
homeRoute.get('/', function (req, res) {
    console.log(path_1.default.join(__dirname, '../views/home.html'));
    // res.sendFile(path.join(__dirname, '../views/home.html'))
    res.sendFile(path_1.default.resolve('src', './views/home.html'));
    // res.sendFile('/views/home.html', { root: 'src' })
});
exports.default = homeRoute;
