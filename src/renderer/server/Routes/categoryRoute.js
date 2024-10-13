import e from "express"
import { addCategory, getAllCategory } from "../controllers/categoryController.js"

const router = e.Router()
router.post("/addCategory",addCategory)
router.get("/getAllCategory",getAllCategory)
export default router