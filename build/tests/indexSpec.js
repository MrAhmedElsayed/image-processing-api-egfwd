"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var filesManage_1 = __importDefault(require("../utilities/filesManage"));
// Create a test to see if the directory exists or not, and if it does not exist, it will be created
describe('createOrReturnDirectory', function () {
    it('should return the directory path', function () {
        var defaultPath = 'public/thumbnails';
        var directoryPath = (0, filesManage_1.default)(defaultPath);
        expect(directoryPath).toBe(defaultPath);
    });
});
