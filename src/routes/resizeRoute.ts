import express from "express";
import sharp from "sharp";
import fs from "fs";
import resizeImage from "../utilities/resize";


const resizeRoute = express.Router();


// get base64 string from image and resize with sharp
resizeRoute.post("/", function (req, res, next) {
  // console.log(req.body);
  const base64Image: string = `${req.body.imageFile}`;
  let parts = base64Image.split(';');
  let mimType = parts[0].split(':')[1];
  let imageData = parts[1].split(',')[1];
  var img = Buffer.from(imageData, 'base64');

  // resize image
  resizeImage(img, req.body.width, req.body.height, req.body.imageFileName, req.body.imageExtension)
  .then(
    (data) => {
      res.send(data);
    }
  )
});

export default resizeRoute;
