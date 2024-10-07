import express from "express"
import userRoute from "./Routes/userRoute.js"
import clientRoute from "./Routes/clientRoute.js"
import productRoute from "./Routes/productRoute.js"
const app = express()

app.use(express.json())
app.use("/user",userRoute)
app.use("/client",clientRoute)
app.use("/product",productRoute)
export default app