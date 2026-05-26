-- CreateTable
CREATE TABLE "RecetteProduit" (
    "recette_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL,
    CONSTRAINT "RecetteProduit_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RecetteProduit_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredients" ("ingredient_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RecetteProduit_product_id_ingredient_id_key" ON "RecetteProduit"("product_id", "ingredient_id");
