import express from 'express'
import { deleteUser, getUsers, Signout, updateUser } from "../controller/user.controller.js";
import {verifyToken} from '../utils/verifyToken.js'

const router = express.Router()

router.get("/users", getUsers);
router.put("/update-user/:id",verifyToken, updateUser);
router.delete("/delete-user/:id", verifyToken, deleteUser);
router.post("/signout", Signout);

export default router