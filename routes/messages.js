import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import {createChatroom, sendChatroomMessage} from '../controllers/messages'
const router = express.Router()

router.get('/', verifyToken)
router.get('/chatroom/create', verifyToken, createChatroom)

router.post('/chatroom/create', verifyToken, createChatroom)

export default router