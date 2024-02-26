import express from 'express';
import {getUser, getUserFriends, addRemoveFriend, searchUser} from '../cotrollers/users.js';
import {verifyToken} from '../middleware/auth.js';

const router = express.Router();

//Read
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

//Update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

//Search users
// router.get("/search", searchUser)

export default router;