import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import {createChatroom, sendChatroomMessage, getChatroom} from '../controllers/messages'
const router = express.Router()

router.get('/', verifyToken)
router.get("/chatrooms/:chatroomId", verifyToken, getChatroom)

router.post('/chatrooms', verifyToken, createChatroom)
router.post('/chatrooms/:chatroomId/messages', verifyToken, sendChatroomMessage)

export default router