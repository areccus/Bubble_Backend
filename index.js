import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import { register } from './controllers/auth.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import chatRoutes from './routes/chat.js'
import { verifyToken } from './middleware/auth.js'
import { createPost} from './controllers/posts.js'
import User from './models/User.js'
import Post from './models/Post.js'
import {users, posts} from './data/index.js'
import { error } from 'console'

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}))
app.use(morgan('common'))
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

/* FILE STORAGE */
const storage = multer.diskStorage({
    // Saves your files to this folder.
    destination: function (req, file, cb) {
        cb(null, './assets/')
    },
    // Creates the file name by using the original file name.
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

//Anytime we need to upload we would use the multer storage we made.
const upload = multer({storage})

/* Routes with files */
app.post('/auth/register', upload.single('picture'), register)
app.post('/posts', verifyToken, upload.single('picture'), createPost)

/* ROUTES */
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/chat', chatRoutes)

/* Mongoose Setup */
const PORT = process.env.PORT || 6001
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server running Port: ${PORT}`))
    // Run one time to add mock users
    // User.insertMany(users)
    // Post.insertMany(posts)
    // Message.insertMany(messages)

}).catch((err) => 
    console.log(`${error} did not connect`)
)
