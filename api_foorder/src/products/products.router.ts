import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "./products.controller.js";

export const productRouter = Router();


productRouter.get("/", getProducts)
productRouter.get("/:productId", getProduct)

productRouter.post("/create", createProduct)

productRouter.patch("/:productId", updateProduct)

productRouter.delete("/:productId", deleteProduct)