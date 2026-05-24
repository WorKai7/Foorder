import express, { type Request, type Response } from "express"
import { userRouter } from "./users/users.router.js"
import { orderRouter } from "./orders/orders.router.js"

const app = express()
const port = 3000

app.use(express.json())

app.use("/users", userRouter)
app.use("/orders", orderRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World !")
})


app.listen(port, () => {
    console.log("Foorder API Server listening on port " + port)
})