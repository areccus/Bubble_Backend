import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { createChat } from '../controllers/chat.js'

const router = express.Router()

router.post('/:chatId', verifyToken, createChat)

export default router