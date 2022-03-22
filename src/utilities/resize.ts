import sharp from 'sharp';

async function resizeImage(image:Buffer, width:number, height:number) {
  try {
    await sharp(image)
      .resize({
        width: width,
        height: height
      })
      .toFile("./public/test-output-images/sammy-resized.png");
  } catch (error) {
    console.log(error);
  }
}


export default resizeImage;