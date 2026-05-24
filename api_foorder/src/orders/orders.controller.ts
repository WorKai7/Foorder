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
            res.status(404).json({ message: "Objet non trouvé en base de donnée" })
        } else {
            res.status(200).json(order)
        }
    } catch {
        res.status(500).json({ message: "Erreur serveur" })
    }
}


export async function createOrder(req: Request, res: Response) {
    try {
        const { name, products } = req.body

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


export async function makeReady(req: Request, res: Response) {
    try {
        const order = prisma.orders.findUnique({
            where: { order_id: Number(req.params.orderId) }
        })

        if (!order) {
            res.status(404).json({ message: "Objet non trouvé en base de donnée" })
        } else {
            try {
                const newOrder = await prisma.orders.update({
                    where: { order_id: Number(req.params.orderId) },
                    data: { status: "READY", ready_hour: new Date() }
                })

                res.status(200).json({ message: `Commande n°${req.params.orderId} prête !`, newOrder })
            } catch (error) {
                res.status(400).json({ message: "Erreur BDD", error })
            }
        }
    } catch {
        res.status(500).json({ message: "Erreur serveur" })
    }
}


export async function makeGiven(req: Request, res: Response) {
    try {
        const order = prisma.orders.findUnique({
            where: { order_id: Number(req.params.orderId) }
        })

        if (!order) {
            res.status(404).json({ message: "Objet non trouvé en base de donnée" })
        } else {
            try {
                const newOrder = await prisma.orders.update({
                    where: { order_id: Number(req.params.orderId) },
                    data: { status: "GIVEN" }
                })

                res.status(200).json({ message: `Commande n°${req.params.orderId} donnée !`, newOrder })
            } catch (error) {
                res.status(400).json({ message: "Erreur BDD", error })
            }
        }
    } catch {
        res.status(500).json({ message: "Erreur serveur" })
    }
}


export async function updateName(req: Request, res: Response) {
    const { name } = req.body

    try {
        const order = await prisma.orders.findUnique({
            where: { order_id: Number(req.params.orderId) }
        })

        if (!order) {
            res.status(404).json({ message: "Objet non trouvé en base de donnée" })
        } else {
            try {
                const newOrder = await prisma.orders.update({
                    where: { order_id: Number(req.params.orderId) },
                    data: {
                        name: name
                    }
                })

                res.status(200).json({ message: `Nom de la commande n°${req.params.orderId} modifiée !`, newOrder })
            } catch (error) {
                res.status(400).json({ message: "Erreur BDD", error })
            }
        }
    } catch {
        res.status(500).json({ message: "Erreur serveur" })
    }
}


export async function addProducts(req: Request, res: Response) {
    try {
        /*
            Structure du body :
            {
                products: [
                    {
                        product_id,
                        quantite 
                    },
                    {
                        product_id,
                        quantite
                    },
                    
                    ...
                ]
            }


            On chopera les ids donnés et on checkera qu'ils existent meme si en vrai dans l'utilisation dans le front c pas specialement utile c une securite
        */
    } catch {
        res.status(500).json({ message: "Erreur serveur" })
    }
}


export async function updateProducts(req: Request, res: Response) {
    try {
       // La même pour le patch 
    } catch {
        res.status(500).json({ message: "Erreur serveur" })
    }
}


// On gèrera les delete aussi