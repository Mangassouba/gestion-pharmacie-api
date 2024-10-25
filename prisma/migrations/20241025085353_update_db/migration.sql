/*
  Warnings:

  - You are about to drop the column `delivery_date` on the `receptions` table. All the data in the column will be lost.
  - You are about to drop the column `order_date` on the `receptions` table. All the data in the column will be lost.
  - You are about to drop the column `ordered_products` on the `receptions` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `receptions` table. All the data in the column will be lost.
  - You are about to drop the column `sold_products` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `products` on the `suppliers` table. All the data in the column will be lost.
  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `receptionDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reception_date` to the `receptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_clientId_fkey";

-- AlterTable
ALTER TABLE "receptionDetails" ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "receptions" DROP COLUMN "delivery_date",
DROP COLUMN "order_date",
DROP COLUMN "ordered_products",
DROP COLUMN "status",
ADD COLUMN     "reception_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "sales" DROP COLUMN "sold_products";

-- AlterTable
ALTER TABLE "suppliers" DROP COLUMN "products";

-- DropTable
DROP TABLE "clients";

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
