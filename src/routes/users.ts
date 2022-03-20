import express from "express";
// import sharp from "sharp";



const userRoute = express.Router();

/* GET home page. */
userRoute.post("/", function (req, res, next) {
  console.log(req.query['file_name']);
  console.log(req.query['width']);
  console.log(req.query['height']);
  res.status(200).send({ message: "Hello from the server !" });
});

export default userRoute;
