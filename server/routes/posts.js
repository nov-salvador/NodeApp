import express from 'express';
import {addComment, getFeedPosts, getUserPosts, likePost} from '../cotrollers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

//Read Posts
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

//Update Posts
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", addComment);

export default router;
