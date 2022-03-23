"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
function createOrReturnDirectory(defaultPath) {
    if (!fs_1.default.existsSync(defaultPath)) {
        fs_1.default.mkdirSync(defaultPath);
        console.log('directory created');
        return defaultPath;
    }
    else {
        console.log('directory already exists');
        return defaultPath;
    }
}
exports.default = createOrReturnDirectory;
