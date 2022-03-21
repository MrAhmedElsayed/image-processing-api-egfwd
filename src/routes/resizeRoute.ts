import express from "express";
import sharp from "sharp";
import fs from "fs";



const userRoute = express.Router();

/* GET home page. */
userRoute.post("/", function (req, res, next) {

  console.log(req.body)
  // https://sharp.pixelplumbing.com/api-constructor

  const image = `C:\\Users\\Ahmed\\Desktop\\image-processing-api-egfwd\\public\\demo-images\\encenadaport.jpg`;

  console.log(image)

  // read image data from stream
  const readStream = fs.createReadStream(image);
  // create writable stream
  const writeStream = fs.createWriteStream(`./public/test-output-images/${req.body.file_name}_${req.body.width}_X_${req.body.height}.png`);

  const transformer = sharp()
    .resize(parseInt(req.body.width), parseInt(req.body.height))
  // Read image data from readableStream
  // Write 200px square auto-cropped image data to writableStream
  readStream
    .pipe(transformer)
    .pipe(writeStream);




  // read image from buffer
  sharp(image)
    .resize(parseInt(req.body.width), parseInt(req.body.height))
    .toBuffer()
    .then(data => {
      // res.send(data);
      res.status(200).send({ message: "Hello from the server !", bufferImage: data.toString('base64') })
    });

  // https://stackoverflow.com/questions/57886005/how-to-decode-base64-to-image-in-nodejs

  // function encode_base64(filename) {
  //   fs.readFile(path.join(__dirname, filename), function (error, data) {
  //     if (error) {
  //       throw error;
  //     } else {
  //       //console.log(data);
  //       var dataBase64 = Buffer.from(data).toString('base64');
  //       console.log(dataBase64);
  //       client.write(dataBase64);
  //     }
  //   });
  // }

  // async function resizeImage() {
  //   try {
  //     await sharp(image)
  //       .resize({
  //         width: 150,
  //         height: 97
  //       })
  //       .toFile("./public/test-output-images/sammy-resized.png");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // resizeImage();


});

export default userRoute;
