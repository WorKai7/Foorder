import type { Request, Response } from "express"
import { prisma } from "../../lib/prisma.js"


export async function getUsers(req: Request, res: Response) {
    try {
        const users = await prisma.user.findMany()

        if (users.length <= 0) {
            res.status(204).send([])
        } else {
            res.status(200).send(users)
        }
    } catch {
        res.status(500).send("Erreur serveur")
    }
}