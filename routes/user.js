import express from "express";
const router = express.Router();
import {register, login, getUserList} from "../controller/user.js";
router.post("/register", register);
router.post("/login", login);
router.get("/all_user", getUserList);



export default router;