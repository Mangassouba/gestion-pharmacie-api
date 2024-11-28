/*
  Warnings:

  - Added the required column `supplierId` to the `receptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "receptions" ADD COLUMN     "supplierId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "receptions" ADD CONSTRAINT "receptions_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
