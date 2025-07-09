/*
  Warnings:

  - You are about to drop the column `zapId` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `zapId` on the `Trigger` table. All the data in the column will be lost.
  - You are about to drop the `Zap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ZapRun` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ZapRunOutBox` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[flowId]` on the table `Action` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[flowId]` on the table `Trigger` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `flowId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flowId` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_zapId_fkey";

-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_zapId_fkey";

-- DropForeignKey
ALTER TABLE "ZapRun" DROP CONSTRAINT "ZapRun_zapId_fkey";

-- DropForeignKey
ALTER TABLE "ZapRunOutBox" DROP CONSTRAINT "ZapRunOutBox_zapRunId_fkey";

-- DropIndex
DROP INDEX "Action_zapId_key";

-- DropIndex
DROP INDEX "Trigger_zapId_key";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "zapId",
ADD COLUMN     "flowId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "zapId",
ADD COLUMN     "flowId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Zap";

-- DropTable
DROP TABLE "ZapRun";

-- DropTable
DROP TABLE "ZapRunOutBox";

-- CreateTable
CREATE TABLE "Flow" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Flow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlowRun" (
    "id" TEXT NOT NULL,
    "flowId" TEXT NOT NULL,

    CONSTRAINT "FlowRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlowRunOutBox" (
    "id" TEXT NOT NULL,
    "flowRunId" TEXT NOT NULL,

    CONSTRAINT "FlowRunOutBox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FlowRunOutBox_flowRunId_key" ON "FlowRunOutBox"("flowRunId");

-- CreateIndex
CREATE UNIQUE INDEX "Action_flowId_key" ON "Action"("flowId");

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_flowId_key" ON "Trigger"("flowId");

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "Flow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "Flow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlowRun" ADD CONSTRAINT "FlowRun_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "Flow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlowRunOutBox" ADD CONSTRAINT "FlowRunOutBox_flowRunId_fkey" FOREIGN KEY ("flowRunId") REFERENCES "FlowRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
