import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import {getUser} from '../controllers/users.js'
import { getMessage, createMessage } from '../controllers/messages.js'

const router = express.Router()

router.get('/', verifyToken)
router.get('/messages', verifyToken, getMessage)

router.post('/messages/create', verifyToken, createMessage)

export default router