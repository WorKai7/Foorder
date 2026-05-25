import { Router } from "express";
import { addProducts, createOrder, deleteOrder, deleteProducts, getOrder, getOrders, makeGiven, makeReady, updateName, updateProducts } from "./orders.controller.js";

export const orderRouter = Router();

orderRouter.get("/", getOrders)
orderRouter.get("/:orderId", getOrder)

orderRouter.post("/", createOrder)

orderRouter.patch("/ready/:orderId", makeReady)
orderRouter.patch("/given/:orderId", makeGiven)
orderRouter.patch("/name/:orderId", updateName)
orderRouter.patch("/products/add/:orderId", addProducts)
orderRouter.patch("/products/update/:orderId", updateProducts)

orderRouter.delete("/:orderId", deleteOrder)
orderRouter.delete("/products/delete/:orderId", deleteProducts)