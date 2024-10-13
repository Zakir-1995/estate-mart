import express from "express";
import { googleSignin, Signin, Signout, Signup } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", Signin);
router.post("/google", googleSignin);
router.post("/signout", Signout);

export default router;
