/*
  Warnings:

  - You are about to drop the column `adresse` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `date_commande` on the `receptions` table. All the data in the column will be lost.
  - You are about to drop the column `date_livraison` on the `receptions` table. All the data in the column will be lost.
  - You are about to drop the column `produits_commandes` on the `receptions` table. All the data in the column will be lost.
  - You are about to drop the column `statut` on the `receptions` table. All the data in the column will be lost.
  - You are about to drop the column `utilisateurId` on the `receptions` table. All the data in the column will be lost.
  - You are about to drop the `commandes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `detailCmd` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `detailReceptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `detailVentes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fournisseurs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inventaires` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lots` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mouvementStocks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `utilisateurs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ventes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_date` to the `receptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_date` to the `receptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ordered_products` to the `receptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `receptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `receptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "commandes" DROP CONSTRAINT "commandes_clientId_fkey";

-- DropForeignKey
ALTER TABLE "commandes" DROP CONSTRAINT "commandes_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "detailCmd" DROP CONSTRAINT "detailCmd_commandeId_fkey";

-- DropForeignKey
ALTER TABLE "detailCmd" DROP CONSTRAINT "detailCmd_produitId_fkey";

-- DropForeignKey
ALTER TABLE "detailReceptions" DROP CONSTRAINT "detailReceptions_produitId_fkey";

-- DropForeignKey
ALTER TABLE "detailReceptions" DROP CONSTRAINT "detailReceptions_receptionId_fkey";

-- DropForeignKey
ALTER TABLE "detailVentes" DROP CONSTRAINT "detailVentes_produitId_fkey";

-- DropForeignKey
ALTER TABLE "detailVentes" DROP CONSTRAINT "detailVentes_venteId_fkey";

-- DropForeignKey
ALTER TABLE "inventaires" DROP CONSTRAINT "inventaires_produitId_fkey";

-- DropForeignKey
ALTER TABLE "lots" DROP CONSTRAINT "lots_produitId_fkey";

-- DropForeignKey
ALTER TABLE "mouvementStocks" DROP CONSTRAINT "mouvementStocks_produitId_fkey";

-- DropForeignKey
ALTER TABLE "receptions" DROP CONSTRAINT "receptions_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "ventes" DROP CONSTRAINT "ventes_utilisateurId_fkey";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "adresse",
DROP COLUMN "nom",
DROP COLUMN "prenom",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "receptions" DROP COLUMN "date_commande",
DROP COLUMN "date_livraison",
DROP COLUMN "produits_commandes",
DROP COLUMN "statut",
DROP COLUMN "utilisateurId",
ADD COLUMN     "delivery_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "order_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ordered_products" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "commandes";

-- DropTable
DROP TABLE "detailCmd";

-- DropTable
DROP TABLE "detailReceptions";

-- DropTable
DROP TABLE "detailVentes";

-- DropTable
DROP TABLE "fournisseurs";

-- DropTable
DROP TABLE "inventaires";

-- DropTable
DROP TABLE "lots";

-- DropTable
DROP TABLE "mouvementStocks";

-- DropTable
DROP TABLE "produits";

-- DropTable
DROP TABLE "utilisateurs";

-- DropTable
DROP TABLE "ventes";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "stock" INTEGER NOT NULL,
    "sale_price" INTEGER NOT NULL,
    "purchase_price" INTEGER NOT NULL,
    "threshold" INTEGER NOT NULL,
    "prescription_req" BOOLEAN NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "sold_products" TEXT NOT NULL,
    "sale_date" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saleDetails" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "saleId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "saleDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "clientId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderDetails" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "orderDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receptionDetails" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "receptionId" INTEGER NOT NULL,

    CONSTRAINT "receptionDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "products" TEXT NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batches" (
    "id" SERIAL NOT NULL,
    "batch_number" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventories" (
    "id" SERIAL NOT NULL,
    "inventory_date" TIMESTAMP(3) NOT NULL,
    "stock" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "inventories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stockMovements" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "movement_date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "stockMovements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saleDetails" ADD CONSTRAINT "saleDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saleDetails" ADD CONSTRAINT "saleDetails_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderDetails" ADD CONSTRAINT "orderDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderDetails" ADD CONSTRAINT "orderDetails_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receptions" ADD CONSTRAINT "receptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receptionDetails" ADD CONSTRAINT "receptionDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receptionDetails" ADD CONSTRAINT "receptionDetails_receptionId_fkey" FOREIGN KEY ("receptionId") REFERENCES "receptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batches" ADD CONSTRAINT "batches_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stockMovements" ADD CONSTRAINT "stockMovements_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
