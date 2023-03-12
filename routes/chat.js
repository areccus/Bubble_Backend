import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { createChat, postMessage, getMessage, getChats } from '../controllers/chat.js'

const router = express.Router()

router.get('/', verifyToken)
router.post('/:chatId', verifyToken, createChat)
router.post('/:chatId/messages', verifyToken, postMessage)
router.get('/:chatId/messages', verifyToken, getMessage)
router.get('/chats/:userId', verifyToken, getChats)

export default router