/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `Feedback` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Feedback_text_key" ON "Feedback"("text");
