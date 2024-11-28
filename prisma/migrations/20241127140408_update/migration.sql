-- AlterTable
ALTER TABLE "products" ALTER COLUMN "sale_price" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "purchase_price" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "receptionDetails" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "saleDetails" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);
