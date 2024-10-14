import express from 'express'
import { getUsers, updateUser } from "../controller/user.controller.js";
import {verifyToken} from '../utils/verifyToken.js'

const router = express.Router()

router.get("/users", getUsers);
router.post("/update-user/:id",verifyToken, updateUser);

export default router