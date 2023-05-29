import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import userRouter from './route/user.js'
import adminRouter from './route/admin.js'
import dbConnect from './config/database.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()


const app = express()


const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cookieParser())
app.set(express.static('public'))
app.use(express.static('public'))
app.use(cors(corsOptions))
app.use(bodyParser())
app.use(bodyParser.json());

app.use('/', userRouter)
app.use('/admin', adminRouter)

dbConnect(() => {
    app.listen(process.env.port || 8000, () => console.log('server listening at http://localhost:8000/'))
})