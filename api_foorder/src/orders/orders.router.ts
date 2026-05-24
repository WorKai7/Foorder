import { Router } from "express";
import { createOrder, getOrder, getOrders, makeGiven, makeReady, updateName } from "./orders.controller.js";

export const orderRouter = Router();

orderRouter.get("/", getOrders)
orderRouter.get("/:orderId", getOrder)

orderRouter.post("/", createOrder)

orderRouter.patch("/ready/:orderId", makeReady)
orderRouter.patch("/given/:orderId", makeGiven)
orderRouter.patch("/name/:orderId", updateName)