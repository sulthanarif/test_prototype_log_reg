import express  from "express";
import {getUsers, Login, Register} from "../controller/userController.js";
// import { verifyToken } from "../midleware/verify.js";
// import { refreshToken } from "../controller/refreshToken.js";
const router = express.Router();

router.get("/users", getUsers)
router.post("/users", Register)
router.post("/login", Login)
// router.get("/token", refreshToken)


export default router;