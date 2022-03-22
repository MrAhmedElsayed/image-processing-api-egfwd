import express from "express";
import sharp from "sharp";
import fs from "fs";
import { pipeline, Stream } from "stream";
import resizeImage from "../utilities/resize";


const resizeRoute = express.Router();


// get base64 string from image and resize with sharp
resizeRoute.post("/", function (req, res, next) {
  // console.log(req.body);
  const base64Image: string = `${req.body.imageFile}`;
  let parts = base64Image.split(';');
  let mimType = parts[0].split(':')[1];
  let imageData = parts[1].split(',')[1];
  var img = new Buffer(imageData, 'base64');


  // resize image
  resizeImage(img, req.body.width, req.body.height)

  // const transformer = sharp(img)
  //   .resize(parseInt(req.body.width), parseInt(req.body.height))
  //   .toBuffer()

  //   .then(data => {
  //     // res.send(data);
  //     res.status(200).send({ message: "resize Done", bufferImage: data.toString('base64') })
  //   })

  //   .catch(error => {
  //     // error handeling
  //     res.send(error)
  //   })

  // // read image data from stream
  // const readStream = fs.createReadStream(img);
  // // create writable stream
  // const writeStream = fs.createWriteStream(`./public/test-output-images/${req.body.imageFileName}_${req.body.width}_X_${req.body.height}.png`);


  // readStream.pipe(transformer).pipe(writeStream);



});

export default resizeRoute;
