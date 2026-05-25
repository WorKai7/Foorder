-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductOrderRelation" (
    "relation_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL,
    CONSTRAINT "ProductOrderRelation_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders" ("order_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProductOrderRelation_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductOrderRelation" ("order_id", "product_id", "quantite", "relation_id") SELECT "order_id", "product_id", "quantite", "relation_id" FROM "ProductOrderRelation";
DROP TABLE "ProductOrderRelation";
ALTER TABLE "new_ProductOrderRelation" RENAME TO "ProductOrderRelation";
CREATE UNIQUE INDEX "ProductOrderRelation_order_id_product_id_key" ON "ProductOrderRelation"("order_id", "product_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
