import { Router } from "express";
import { createOrder, getOrder, getOrders } from "./orders.controller.js";

export const orderRouter = Router();

orderRouter.get("/", getOrders)
orderRouter.get("/:orderId", getOrder)

orderRouter.post("/", createOrder)