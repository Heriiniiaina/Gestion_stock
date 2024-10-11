import e from "express";
import { addClient, getAllClient } from "../controllers/clientController.js";

const router = e.Router()

router.post("/addClient",addClient)
router.get("/getAllClient",getAllClient)
export default router