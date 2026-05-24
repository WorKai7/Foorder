-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "order_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "status" TEXT NOT NULL,
    "order_hour" DATETIME NOT NULL,
    "ready_hour" DATETIME
);
INSERT INTO "new_Order" ("name", "order_hour", "order_id", "ready_hour", "status") SELECT "name", "order_hour", "order_id", "ready_hour", "status" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
