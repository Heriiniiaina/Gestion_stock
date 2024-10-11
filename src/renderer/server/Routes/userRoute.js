import e from "express";
import { addUser,loginUser } from "../controllers/userController.js";

const router = e.Router()

router.post("/addUser",addUser)
router.post("/login",loginUser)
export default router

