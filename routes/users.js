import  express  from "express";
import {getUser, getUserFriends, addRemoveFriend, searchUser} from '../controllers/users.js'
import {verifyToken} from '../middleware/auth.js'

const router = express.Router()

/* READ */
router.get('/:id/friends', verifyToken, getUserFriends)
router.get('/:userName', verifyToken, searchUser)

/* UPDATE */
router.patch('/:id/:friendId', verifyToken, addRemoveFriend)

export default router