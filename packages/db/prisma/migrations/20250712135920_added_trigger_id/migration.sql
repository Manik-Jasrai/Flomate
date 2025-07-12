/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `AvailableAction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `AvailableTrigger` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `triggerId` to the `Flow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "metaData" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "Flow" ADD COLUMN     "triggerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AvailableAction_name_key" ON "AvailableAction"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AvailableTrigger_name_key" ON "AvailableTrigger"("name");
