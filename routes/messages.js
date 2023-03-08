import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import {getUser} from '../controllers/users.js'
import { getMessage, createMessage, getMessagedUsers, createGroupChat } from '../controllers/messages.js'

const router = express.Router()

router.get('/', verifyToken)
router.get('/messages', getMessage)

router.post('/messages', createMessage)

export default router