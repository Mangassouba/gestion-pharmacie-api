-- DropForeignKey
ALTER TABLE "stockMovements" DROP CONSTRAINT "stockMovements_productId_fkey";

-- AddForeignKey
ALTER TABLE "stockMovements" ADD CONSTRAINT "stockMovements_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
