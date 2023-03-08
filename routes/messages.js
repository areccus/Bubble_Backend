import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import {getUser} from '../controllers/users.js'
import { getMessage, createMessage, getMessagedUsers, createChatroom } from '../controllers/messages.js'

const router = express.Router()

router.get('/', verifyToken)

router.post('/:id', verifyToken, createChatroom)

export default router