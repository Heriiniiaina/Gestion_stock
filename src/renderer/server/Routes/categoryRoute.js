import e from "express"
import { addCategory, deleteCategory, getAllCategory } from "../controllers/categoryController.js"

const router = e.Router()
router.post("/addCategory",addCategory)
router.get("/getAllCategory",getAllCategory)
router.delete("/delete/:id",deleteCategory)
export default router