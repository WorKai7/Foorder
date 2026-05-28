import { Router } from "express";
import { createIngredient, deleteIngredient, getIngredient, getIngredients, updateIngredient } from "./ingredients.controller.js";

export const ingredientRouter = Router();

ingredientRouter.get("/", getIngredients)
ingredientRouter.get("/:ingredientId", getIngredient)

ingredientRouter.post("/", createIngredient)

ingredientRouter.patch("/:ingredientId", updateIngredient)

ingredientRouter.delete("/:ingredientId", deleteIngredient)