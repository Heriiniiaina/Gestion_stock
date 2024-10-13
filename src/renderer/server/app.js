import express from "express"
import userRoute from "./Routes/userRoute.js"
import clientRoute from "./Routes/clientRoute.js"
import productRoute from "./Routes/productRoute.js"
import categoryRoute from "./Routes/categoryRoute.js"
import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors({
    methods:["POST","GET","PUT","DELETE"],
    origin:["http://localhost:5173"],
    credentials:true
}))
app.use("/user",userRoute)
app.use("/client",clientRoute)
app.use("/product",productRoute)
app.use("/category",categoryRoute)

app.listen(8000,()=>{
    console.log("Connected")
})