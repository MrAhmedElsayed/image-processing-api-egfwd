import express from "express";
import morgan from "morgan";
import path from "path";
import homeRoute from "./routes/home";
import userRoute from "./routes/users";

const app = express();
app.use(express.static(path.join(__dirname, "../public")));

app.use(morgan("dev"));

//add the router
app.use("/", homeRoute);
app.use("/resize", userRoute);

// handle 404 responses
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views/notfound.html"));
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(process.env.port || 3000);

console.log("Server started at http://localhost: 3000");
