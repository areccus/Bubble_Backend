import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import {createChatroom, sendChatroomMessage, getChatroom} from '../controllers/messages'
const router = express.Router()

router.get("/:id", verifyToken, getChatroom)

router.post('/', verifyToken, createChatroom)
router.post('/:id/messages', verifyToken, sendChatroomMessage)

export default router