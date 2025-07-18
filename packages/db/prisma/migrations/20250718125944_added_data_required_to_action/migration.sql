-- AlterTable
ALTER TABLE "AvailableAction" ADD COLUMN     "dataRequired" TEXT[] DEFAULT ARRAY[]::TEXT[];
