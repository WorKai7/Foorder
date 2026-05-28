import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";


export async function getProducts(req: Request, res: Response) {
    try {
        const products = await prisma.products.findMany({
            include: {
                ingredients: {
                    select: {
                        ingredient: true,
                        quantite: true
                    }
                }
            }
        })

        if (products.length <= 0) return res.status(204).json([])

        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ message: "Erreur : " + error })
    }
}


export async function getProduct(req: Request, res: Response) {
    try {
        const product = await prisma.products.findUnique({
            where: { product_id: Number(req.params.productId) },
            include: {
                ingredients: {
                    select: {
                        ingredient: true,
                        quantite: true
                    }
                }
            }
        })

        if (!product) return res.status(404).json({ message: "Objet non trouvé dans la base de données" })

        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({ message: "Erreur : " + error })
    }
}


export async function createProduct(req: Request, res: Response) {
    try {
        const { name, price } = req.body
        const newProduct = await prisma.products.create({
            data: {
                name: name,
                price: price
            }
        })

        return res.status(201).json(newProduct)
    } catch (error) {
        return res.status(500).json({ message: "Erreur : " + error })
    }
}


export async function updateProduct(req: Request, res: Response) {
    try {
        const { name, price } = req.body
        const newProduct = await prisma.products.update({
            where: { product_id: Number(req.params.productId) },
            data: {
                name: name,
                price: price
            }
        })

        return res.status(201).json(newProduct)
    } catch (error) {
        return res.status(500).json({ message: "Erreur : " + error })
    }
}


export async function deleteProduct(req: Request, res: Response) {
    try {
        const deletedProduct = await prisma.products.delete({
            where: { product_id: Number(req.params.productId) }
        })

        return res.status(200).json(deletedProduct)
    } catch (error) {
        return res.status(500).json({ message: "Erreur : " + error })
    }
}