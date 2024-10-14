import e from "express";
import { addClient, deleteClient, getAllClient, updateClient } from "../controllers/clientController.js";

const router = e.Router()

router.post("/addClient",addClient)
router.get("/getAllClient",getAllClient)
router.delete("/delete/:id",deleteClient)
router.put("/update/:id",updateClient)
export default router