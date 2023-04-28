/*
  Warnings:

  - You are about to alter the column `rating` on the `Feedback` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Feedback" ("createdAt", "id", "rating", "text", "updatedAt") SELECT "createdAt", "id", "rating", "text", "updatedAt" FROM "Feedback";
DROP TABLE "Feedback";
ALTER TABLE "new_Feedback" RENAME TO "Feedback";
CREATE UNIQUE INDEX "Feedback_text_key" ON "Feedback"("text");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
