import express from 'express'
import { register } from '../controller/user.controller.js'

const router = express.Router()

router.get("/test",register)

export default router