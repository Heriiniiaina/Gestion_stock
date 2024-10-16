import { addAchat, getAllAchat } from "../controllers/achatController.js";

import express from "express"

const router = express.Router()

router.post("/AddaChat",addAchat)
router.get("/getAchat",getAllAchat)
export default router

