import e from "express";
import { addProduct, deleteProduct, getAllProduct, updateProduct } from "../controllers/productController.js";
const router = e.Router()

router.post("/addProduct",addProduct)

router.get("/getAllProduct",getAllProduct)
router.delete("/delete/:id",deleteProduct)
router.put("/update/:id",updateProduct)
export default router