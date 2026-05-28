import { prisma } from "../lib/prisma.js"

async function main() {
    await prisma.recetteProduit.deleteMany();
    await prisma.productOrderRelation.deleteMany();
    await prisma.user.deleteMany();
    await prisma.products.deleteMany();
    await prisma.orders.deleteMany();
    await prisma.ingredients.deleteMany();

    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='ProductOrderRelation'`
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='User'`;
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Orders'`;
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Products'`;
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Ingredients'`;

    
    await prisma.user.create({
        data: {
            username: "Jérôme",
            password: "1234"
        }
    })


    await prisma.ingredients.createMany({
        data: [
            {
                name: "Saucisse",
                stock: 50
            },
            {
                name: "Merguez",
                stock: 50
            }
        ]
    })


    await prisma.products.createMany({
        data: [
            {
                name: "Sandwich saucisse",
                price: 5
            },
            {
                name: "Américain saucisse",
                price: 6.50
            },
            {
                name: "Sandwich merguez",
                price: 5
            },
            {
                name: "Américain merguez",
                price: 6.50
            }
        ]
    })


    await prisma.recetteProduit.create({
        data: {
            product: {
                connect: { product_id: 1 }
            },
            ingredient: {
                connect: { ingredient_id: 1 }
            },
            quantite: 1
        }
    })

    await prisma.recetteProduit.create({
        data: {
            product: {
                connect: { product_id: 2 }
            },
            ingredient: {
                connect: { ingredient_id: 1 }
            },
            quantite: 1
        }
    })

    await prisma.recetteProduit.create({
        data: {
            product: {
                connect: { product_id: 3 }
            },
            ingredient: {
                connect: { ingredient_id: 2 }
            },
            quantite: 1
        }
    })

    await prisma.recetteProduit.create({
        data: {
            product: {
                connect: { product_id: 4 }
            },
            ingredient: {
                connect: { ingredient_id: 2 }
            },
            quantite: 1
        }
    })


    await prisma.orders.create({
        data: {
            name: "Vandewalle",
            order_hour: new Date(),
            ready_hour: new Date(),
            status: "READY",
            products: {
                create: [
                    {
                        product: {
                            connect: { product_id: 2 }
                        },
                        quantite: 1
                    },
                    {
                        product: {
                            connect: { product_id: 4 }
                        },
                        quantite: 2
                    }
                ]
            }
        }
    })
    
    await prisma.orders.create({
        data: {
            name: "Vandewalle2",
            order_hour: new Date(),
            status: "PREPARATION",
            products: {
                create: [
                    {
                        product: {
                            connect: { product_id: 2 }
                        },
                        quantite: 3
                    },
                    {
                        product: {
                            connect: { product_id: 4 }
                        },
                        quantite: 2
                    }
                ]
            }
        }
    })
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
