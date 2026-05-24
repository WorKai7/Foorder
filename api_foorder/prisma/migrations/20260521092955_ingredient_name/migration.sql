/*
  Warnings:

  - Added the required column `name` to the `Ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingredients" (
    "ingredient_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "stock" INTEGER NOT NULL
);
INSERT INTO "new_Ingredients" ("ingredient_id", "stock") SELECT "ingredient_id", "stock" FROM "Ingredients";
DROP TABLE "Ingredients";
ALTER TABLE "new_Ingredients" RENAME TO "Ingredients";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
