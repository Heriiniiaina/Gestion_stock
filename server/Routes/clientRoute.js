import e from "express";
import { addClient } from "../controllers/clientController.js";

const router = e.Router()

router.post("/addClient",addClient)

export default router