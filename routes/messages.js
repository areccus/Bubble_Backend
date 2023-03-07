import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import {getUser} from '../controllers/users.js'
import { getMessage, createMessage, getMessagedUsers, createGroupChat } from '../controllers/messages.js'

const router = express.Router()

router.get('/', verifyToken)
router.get('/messages', getMessage)
router.get("/messages/messagedUsers/:userId", getMessagedUsers)

router.post('/messages', createMessage)
router.post("/groupChats", createGroupChat);

export default router