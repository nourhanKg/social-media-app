//Importing required packages
//Note: I changed type in jsonpackage to module to use import instead of require
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { registerUser } from "./controllers/authController.js";
import { addPost } from "./controllers/postController.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import verifyToken from "./middleware/authorization.js";
// import User from "./models/userModel.js";
// import Post from "./models/postModel.js";
// import { users, posts } from "./data/index.js";
//Congiguration Middleware
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Those are only needed when we use type module
///////

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
///////

//File storage configration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
///////
//Routes with files
//I am trying to register to website
app.post("/auth/register", upload.single("picture"), registerUser);
app.post("/posts", upload.single("picture"), verifyToken, addPost);
//////
//Routes
//1)Auth Routes
app.use("/auth", authRoutes);
//2)User Routes
app.use("/users", userRoutes);
//3)Post Routes
app.use("/posts", postRoutes);
//Mongoose configration//
const PORT = process.env.PORT || 6001;
const DB_URL = process.env.MONGO_DB_URL;
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
  })
  .catch((err) => console.log(err.message));
