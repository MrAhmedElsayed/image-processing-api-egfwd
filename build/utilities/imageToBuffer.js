"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// convert base64 image to buffer
function base64ToBuffer(base64) {
    var parts = base64.split(';');
    var imageData = parts[1].split(',')[1];
    return Buffer.from(imageData, 'base64');
}
exports.default = base64ToBuffer;
