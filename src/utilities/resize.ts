import sharp from 'sharp';

async function resizeImage(image:string, width:number, height:number) {
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


