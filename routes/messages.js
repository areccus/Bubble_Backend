import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import {createChatroom, sendChatroomMessage} from '../controllers/messages'
const router = express.Router()

router.get('/', verifyToken)
router.post('/chatrooms', verifyToken, createChatroom)

// router.post('/chatrooms/:chatroomId/messages', verifyToken, sendChatroomMessage)

export default router