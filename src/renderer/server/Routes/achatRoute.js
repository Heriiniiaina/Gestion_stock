import { addAchat } from "../controllers/achatController.js";

import express from "express"

const router = express.Router()

router.post("/AddaChat",addAchat)

export default router

