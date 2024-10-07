import e from "express";
import { addProduct, getAllProduct } from "../controllers/productController.js";
const router = e.Router()

router.post("/addProduct",addProduct)

router.post("/getAllProduct",getAllProduct)

export default router