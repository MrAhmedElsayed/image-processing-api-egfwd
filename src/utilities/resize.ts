import sharp from "sharp";

async function resizeImage(
  image: Buffer,
  width: number,
  height: number,
  fileName: string,
  imageExtension: string
) {
  try {
    await sharp(image)
      .resize({
        width: width,
        height: height,
      })
      .toFile("./public/thumbnails/" + `${fileName}_${width}_X_${height}.${imageExtension}`)
      .then((data) => {
        // send base64 string
        console.log("resize done");
      });
  } catch (error) {
    console.log(error);
  }

  const semiTransparentRedPng = await sharp(image)
    .resize({
      width: width,
      height: height,
    })
    .toBuffer()
    .then((data) => {
      let returnedData = { bufferImage: data.toString("base64") };
      return returnedData;
    }
    );

  return semiTransparentRedPng;

}

export default resizeImage;
