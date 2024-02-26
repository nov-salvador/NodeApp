import express from 'express';
import process from 'node:process';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { register } from './cotrollers/auth.js';
import {createPost} from './cotrollers/posts.js'
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postsRoutes from './routes/posts.js';
import { verifyToken } from './middleware/auth.js';
import User from './models/user.js';
import Post from './models/posts.js';
import {users, posts} from './data/index.js'
import { searchUser } from './cotrollers/users.js';

//MongoDB



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const PORT = process.env.PORT || 6001;
app.set('port', PORT);

//Setup Mongoose
mongoose.connect(process.env.DB_URL)

// Add your middleware
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, '/public/assets')));

//Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer((storage));

//Auth with picture
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

//Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postsRoutes);

//Search for users
app.get("/search", searchUser)


app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
  //Manual adding Data
  // User.insertMany(users);
  // Post.insertMany(posts);
});


