import express from 'express'
import { checkAuthentication } from '../Middleware/Middleware.js'
import { getEventDetails, loginAdmin } from '../controller/admin.js'
import bcrypt from 'bcrypt'
import AdminModel from '../model/AdminModel.js'

const router = express.Router()

router.post('/login', loginAdmin)
router.post('/getEventDetails', checkAuthentication, getEventDetails)

export default router