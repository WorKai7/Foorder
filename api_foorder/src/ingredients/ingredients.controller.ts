import type { Request, Response } from "express"
import { prisma } from "../../lib/prisma.js"

export async function getIngredients(req: Request, res: Response) {
    try {
        const ingredients = await prisma.ingredients.findMany()

        if (ingredients.length <= 0) return res.status(204).json([])

        return res.status(200).json(ingredients)
    } catch (error) {
        return res.status(500).json("Erreur : " + error)
    }
}


export async function getIngredient(req: Request, res: Response) {
    try {
        const ingredient = await prisma.ingredients.findUnique({
            where: { ingredient_id: Number(req.params.ingredientId) }
        })

        return res.status(200).json(ingredient)
    } catch (error) {
        return res.status(500).json("Erreur : " + error)
    }
}


export async function createIngredient(req: Request, res: Response) {
    try {
        const { name, stock } = req.body

        const newIngredient = await prisma.ingredients.create({
            data: {
                name: name,
                stock: stock
            }
        })

        return res.status(201).json(newIngredient)
    } catch (error) {
        return res.status(500).json("Erreur : " + error)
    }
}


export async function updateIngredient(req: Request, res: Response) {
    try {
        const { name, stock } = req.body
        const newIngredient = await prisma.ingredients.update({
            where: { ingredient_id: Number(req.params.ingredientId) },
            data: {
                name: name,
                stock: stock
            }
        })

        return res.status(200).json(newIngredient)
    } catch (error) {
        return res.status(500).json("Erreur : " + error)
    }
}


export async function deleteIngredient(req: Request, res: Response) {
    try {
        const deletedIngredient = await prisma.ingredients.delete({
            where: { ingredient_id: Number(req.params.ingredientId) }
        })

        return res.status(200).json(deletedIngredient)
    } catch (error) {
        return res.status(500).json("Erreur : " + error)
    }
}