import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import hemlet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import blogRoutes from "./routes/blog.js";
import categoryRoutes from "./routes/category.js"
import { login, register } from "./controllers/auth.js";
import { createBlog, getBlogs, getSingleBlog } from "./controllers/blog.js";
import deleteRoutes from "./routes/delete.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(hemlet());
app.use(hemlet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));
// app.use(express.static(__dirname,'public'));
app.use('/uploads', express.static('uploads'));

// FILE STORAGE
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.filename));
//   },
// });
// const upload = multer({ storage });

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//Endpoints
app.use("/auth/register", upload.single("userImage"), register);
app.use("/auth/login", login);
app.use("/blog", upload.single("blogImage"), createBlog);
app.use("/blogs", getBlogs);
app.use("/",upload.single("blogImage"), blogRoutes);

//GET CATEGORY
app.use("/category", categoryRoutes)

//DELETE BLOG
app.use("/delete", deleteRoutes)

//MongoDB Connection
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`SERVER IS RUNNNING IN ${PORT}...`));
  })
  .catch((error) => console.log(`${error} did not connect!`));