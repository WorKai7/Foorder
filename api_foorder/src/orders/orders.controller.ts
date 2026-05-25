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

        if (orders.length <= 0) return res.status(204).json([])

        return res.status(200).json(orders)

    } catch {
        return res.status(500).json({ message: "Erreur serveur" })
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

        if (!order) return res.status(404).json({ message: "Objet non trouvé en base de donnée" })

        return res.status(200).json(order)

    } catch {
        return res.status(500).json({ message: "Erreur serveur" })
    }
}


export async function createOrder(req: Request, res: Response) {
    try {
        const { name, products } = req.body

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

        return res.status(201).json(newOrder)


    } catch (error) {
        return res.status(500).json({ message: "Erreur: " + error })
    }
}


export async function makeReady(req: Request, res: Response) {
    try {
        const order = prisma.orders.findUnique({
            where: { order_id: Number(req.params.orderId) }
        })

        if (!order) return res.status(404).json({ message: "Objet non trouvé en base de donnée" })

        const newOrder = await prisma.orders.update({
            where: { order_id: Number(req.params.orderId) },
            data: { status: "READY", ready_hour: new Date() }
        })

        return res.status(200).json({ message: `Commande n°${req.params.orderId} prête !`, newOrder })


    } catch (error) {
        return res.status(500).json({ message: "Erreur: " + error })
    }
}


export async function makeGiven(req: Request, res: Response) {
    try {
        const order = prisma.orders.findUnique({
            where: { order_id: Number(req.params.orderId) }
        })

        if (!order) return res.status(404).json({ message: "Objet non trouvé en base de donnée" })

        const newOrder = await prisma.orders.update({
            where: { order_id: Number(req.params.orderId) },
            data: { status: "GIVEN" }
        })

        return res.status(200).json({ message: `Commande n°${req.params.orderId} donnée !`, newOrder })

    } catch (error) {
        return res.status(500).json({ message: "Erreur: " + error })
    }
}


export async function updateName(req: Request, res: Response) {
    const { name } = req.body

    try {
        const order = await prisma.orders.findUnique({
            where: { order_id: Number(req.params.orderId) }
        })

        if (!order) return res.status(404).json({ message: "Objet non trouvé en base de donnée" })


        const newOrder = await prisma.orders.update({
            where: { order_id: Number(req.params.orderId) },
            data: {
                name: name
            }
        })

        return res.status(200).json({ message: `Nom de la commande n°${req.params.orderId} modifiée !`, newOrder })

    } catch (error) {
        return res.status(500).json({ message: "Erreur: " + error })
    }
}


export async function deleteOrder(req: Request, res: Response) {
    try {
        const deletedOrder = await prisma.orders.delete({ where: { order_id: Number(req.params.orderId) } })
        return res.status(200).json(deletedOrder)

    } catch (error) {
        return res.status(500).json({ message: "Erreur: " + error })
    }
}


// ----- Produits -----


export async function addProducts(req: Request, res: Response) {
    /*
        Body :
        {
            [
                {
                    product_id,
                    quantite
                },
                
                ...
            ]
        }
    */

    try {
        const products = req.body

        if (products.length <= 0) return res.status(204).json({ message: "Rien n'a été ajouté" })

        const newOrder = await prisma.orders.update({
            where: { order_id: Number(req.params.orderId) },
            data: {
                products: {
                    create: products.products.map((p: { product_id: number, quantite: number }) => ({
                        quantite: p.quantite,
                        product: {
                            connect: {
                                product_id: p.product_id
                            }
                        }
                    }))
                }
            },
            include: {
                products: true
            }
        })

        return res.status(200).json(newOrder)
    } catch (error) {
        return res.status(500).json({ message: "Erreur: " + error })
    }
}


export async function updateProducts(req: Request, res: Response) {
    /*
        Body :
        {
            [
                {
                    product_id,
                    quantite
                },

                ...
            ]
        }
    */

    try {
        const products = req.body

        if (products.length <= 0) return res.status(204).json({ message: "Rien n'a été modifié" })

        const newOrder = await prisma.orders.update({
            where: { order_id: Number(req.params.orderId) },
            data: {
                products: {
                    update: products.products.map((p: { product_id: number, quantite: number }) => ({
                        where: {
                            order_id_product_id: {
                                order_id: Number(req.params.orderId),
                                product_id: p.product_id
                            }
                        },
                        data: {
                            product_id: p.product_id,
                            quantite: p.quantite
                        }
                    }))
                }
            },
            include: {
                products: true
            }
        })

        return res.status(200).json(newOrder)
    } catch (error) {
        return res.status(500).json({ message: "Erreur: " + error })
    }
}


export async function deleteProducts(req: Request, res: Response) {
    /*
        Body :
        {
            "ids": [id, id, id, ...]
        }
    */

    try {
        const products_ids = req.body.ids

        const deletedOrder = await prisma.orders.update({
            where: { order_id: Number(req.params.orderId) },
            data: {
                products: {
                    delete: products_ids.map((id: number) => ({
                        order_id_product_id: {
                            order_id: Number(req.params.orderId),
                            product_id: id
                        }
                    }))
                }
            },
            include: {
                products: true
            }
        })

        return res.status(200).json(deletedOrder)
    } catch (error) {
        return res.status(500).json({ message: "Erreur: " + error })
    }
}
