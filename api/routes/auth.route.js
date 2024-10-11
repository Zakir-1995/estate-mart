import express from "express";
import { Signin, Signout, Signup } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", Signin);
router.post("/signout", Signout);

export default router;
