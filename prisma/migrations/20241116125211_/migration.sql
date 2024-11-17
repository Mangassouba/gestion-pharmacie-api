-- DropForeignKey
ALTER TABLE "orderDetails" DROP CONSTRAINT "orderDetails_orderId_fkey";

-- DropForeignKey
ALTER TABLE "receptionDetails" DROP CONSTRAINT "receptionDetails_receptionId_fkey";

-- DropForeignKey
ALTER TABLE "saleDetails" DROP CONSTRAINT "saleDetails_saleId_fkey";

-- AddForeignKey
ALTER TABLE "saleDetails" ADD CONSTRAINT "saleDetails_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderDetails" ADD CONSTRAINT "orderDetails_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receptionDetails" ADD CONSTRAINT "receptionDetails_receptionId_fkey" FOREIGN KEY ("receptionId") REFERENCES "receptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
