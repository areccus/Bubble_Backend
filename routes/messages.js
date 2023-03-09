import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import {getUser} from '../controllers/users.js'
import { getMessage, createMessage, getMessagedUsers, createGroupChat } from '../controllers/messages.js'

const router = express.Router()

router.get('/', verifyToken)
router.get('/messages', verifyToken, getMessage)
router.get("/messages/messagedUsers/:userId", verifyToken, getMessagedUsers)

router.post('/messages', verifyToken, createMessage)
router.post("/groupChats", verifyToken, createGroupChat);

export default router