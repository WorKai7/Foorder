import type { Request, Response } from "express"
import { prisma } from "../../lib/prisma.js"


export async function getOrders(req: Request, res: Response) {
    try {
        const orders = await prisma.orders.findMany({
            include: {
                products: {
                    select: {
                        product: true,
                        quantite: true
                    }
                }
            }
        })

        if (orders.length <= 0) {
            res.status(204).json([])
        } else {
            res.status(200).json(orders)
        }
    } catch {
        res.status(500).json({ message: "Erreur serveur" })
    }
}


export async function getOrder(req: Request, res: Response) {
    try {
        const order = await prisma.orders.findUnique({
            where: { order_id: Number(req.params.orderId) },
            include: {
                products: {
                    select: {
                        product: true,
                        quantite: true
                    }
                }
            }
        })

        if (!order) {
            res.status(404).json({ message: "Not found" })
        } else {
            res.status(200).json(order)
        }
    } catch {
        res.status(500).json({ message: "Erreur serveur" })
    }
}


export async function createOrder(req: Request, res: Response) {
    try {
        const {name, products} = req.body

        try {
            const newOrder = await prisma.orders.create({
                data: {
                    name: name,
                    status: "PREPARATION",
                    order_hour: new Date(),
                    products: {
                        create: products.map((p: any) => ({
                            quantite: p.quantite,
                            product: {
                                connect: {
                                    product_id: p.product_id
                                }
                            }
                        }))
                    }
                }
            })

            res.status(201).json(newOrder)
        } catch (error) {
            res.status(400).json({ message: "Erreur BDD", error })
        }
    } catch {
        res.status(500).json({ message: "Erreur serveur" })
    }
}